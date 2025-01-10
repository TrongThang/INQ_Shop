const { Sequelize, Op } = require('sequelize');
const { convertToSlug } = require('../helpers/stringHelper');
const Category = require('../models/Category');
const Device = require('../models/Device');
const ReviewDevice = require('../models/Review_device');
const Warehouse = require('../models/Warehouse');
const {
    
} = require('../services/BlogServices');
const {
    updateStatusDeviceByCategory
} = require('../services/DeviceServices');

const groupCategoriesByListCategories = (categoriesList) => {
    
    const findChildren = (parentId) => {
        return categoriesList
            .filter((item) => item.parentId === parentId)
            .map((child) => ({
                ...child, // Giữ thông tin danh mục hiện tại
                children: findChildren(child.id), // Đệ quy tìm các con
            }));
    };

    const result = categoriesList
        .filter((item) => item.parentId === null)
        .map((rootCategory) => ({
            ...rootCategory, // Giữ thông tin danh mục gốc
            children: findChildren(rootCategory.id), // Tìm các con của danh mục gốc
        }));
        
}

const getCategoryByUser = async () => {
    try {
        const categories = await Category.findAll({
            where: {
                isHide: false, // Chỉ lấy các danh mục không ẩn
                status: 1      // Chỉ lấy danh mục có trạng thái hoạt động
            },
            order: [['created_at', 'ASC']], // Sắp xếp theo thời gian tạo tăng dần
            limit: 5                        // Giới hạn 5 danh mục đầu tiên
        });

        return categories; // Trả về danh sách 5 danh mục
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Ném lỗi nếu có vấn đề xảy ra
    }
};


const getAllCategory_User = async () => {
    const data = await Category.findAll({
        where: { status: 1},
    });


    return await data;
}

const getAllCategory_Admin = async () => {
    const data = await Category.findAll();

    return await data;
}

const getCategoryById = async (id) => {
    return await Category.findByPK(id);
}

const getChildrenCategory = async (parentId) => {
    const categories = await Category.findAll({
        where: { parentId: parentId },
    });

    if (categories.length === 0) {
        return [];
    }

    const children = await Promise.all(
        categories.map(async (category) => {
            const subCategories = await getChildrenCategory(category.id);
            return {
                ...category.toJSON(),
                children: subCategories,
            };
        })
    );

    return children;
}

const getAllCategoryIds = async (category) => {
    let categoryIds = [category.id];

    if (category.children && category.children.length > 0) {
        for (const child of category.children) {
            const childIds = await getAllCategoryIds(child);
            categoryIds = categoryIds.concat(childIds);
        }
    }

    return categoryIds;
};

const getDeviceByCategorySlug = async (slug) => {
    const category = await Category.findOne({
        where: { slug: slug },
    });

    if (!category) {
        throw new Error('Không tìm thấy danh mục được yêu cầu');
    }

    const categoryTree = await getChildrenCategory(category.id);
    const fullCategoryTree = {
        ...category.toJSON(),
        children: categoryTree,
    };

    const categoryIds = await getAllCategoryIds(fullCategoryTree);

    let device = await Device.findAll({
        subQuery: false,
        include: [
            {
                model: ReviewDevice,
                as: 'reviews',
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']
                ],
                required: false
            },
            {
                model: Category,
                as: 'categoryDevice',
                attributes: ['id', 'nameCategory', 'parentId'],
                where: {
                    id: {
                        [Op.in]: categoryIds, 
                    },
                },
            },
            {
                model: Warehouse,
                as: 'warehouse',
                attributes: [] 
            }
        ],
        attributes: [
            'idDevice', 'name', 'slug', 'sellingPrice', 'image', 'descriptionNormal', 'status',
            [Sequelize.col('warehouse.stock'), 'stock']
        ],
        group: ['Device.idDevice'],
    });

    return device;
}

const createCategory = async ({ body }) => {
    const slug = convertToSlug(body.nameCategory);
    body.slug = slug;

    const category = await Category.create(body);

    return category;
}

const updateCategory = async ({ id, ...body }) => {
    const slug = convertToSlug(body.nameCategory);
    body.slug = slug;

    const [updatedCount] = await Category.update(body, {
        where: { id }
    });

    return updatedCount;
}

const updateStatusCategory = async ({ id, status }) => {

    if (status <= 0)
    {
        //Off Category Child, Device, Blog
        const offCategoryChild = await Category.update(
            {
                status: 0,
            },
            {
                where: { 
                    parentId: id
                }
            }
        )

        const offDevice = await updateStatusDeviceByCategory(id)

        // const offBlog = await Blog.update(
        //     {
        //         status: 0,
        //     },
        //     {
        //         where: {
        //             idCategory: id
        //         }
        //     }
        // )
    }

    //Nếu status <== 0 &&
    //Is Hide = True
    //Condition for isHide is False => Status >== 0
    const valueIsHide = status === 0 ? true : false;

    const [updatedCount] = await Category.update(
        {
            status: status,
            valueIsHide: valueIsHide
        }, 
        {
            where: { id }
        }
    );

    return updatedCount;
}

module.exports = {
    getAllCategory_User, getAllCategory_Admin, getCategoryByUser,
    getCategoryById, getChildrenCategory, getAllCategoryIds, getDeviceByCategorySlug,
    createCategory, updateCategory, updateStatusCategory
}