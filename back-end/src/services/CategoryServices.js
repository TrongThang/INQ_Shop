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
    // Loại bỏ trùng lặp dựa trên 'id'
    const uniqueCategories = Array.from(
        new Map(categoriesList.map((item) => [item.id, item])).values()
    );

    const findChildren = (parentId) => {
        return uniqueCategories
            .filter((item) => item.parentId === parentId)
            .map((child) => ({
                ...child, // Giữ thông tin danh mục hiện tại
                children: findChildren(child.id), // Đệ quy tìm các con
            }));
    };

    const result = uniqueCategories
        .filter((item) => item.parentId === null) // Lọc danh mục gốc
        .map((rootCategory) => ({
            ...rootCategory, // Giữ thông tin danh mục gốc
            children: findChildren(rootCategory.id), // Tìm các con của danh mục gốc
        }));

    return result; // Trả về kết quả
};


const getAllCategory_User = async () => {
    try {
        const rawData = await Category.findAll({
            where: { status: 1 },
        });

        // Chuyển đổi chỉ lấy dataValues
        const data = rawData.map((item) => item.dataValues);

        // Nhóm danh mục sau khi làm sạch dữ liệu
        const results = groupCategoriesByListCategories(data);
        return results; // Trả về kết quả đã nhóm
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch categories');
    }
};



const getCategoryByUser = async () => {
    try {
        const categories = await Category.findAll({
            where: {
                isHide: false, // Chỉ lấy các danh mục không ẩn
                status: 1      // Chỉ lấy danh mục có trạng thái hoạt động
            },
            order: [['created_at', 'ASC']], // Sắp xếp theo thời gian tạo tăng dần
            limit: 6                       // Giới hạn 5 danh mục đầu tiên
        });

        return categories; // Trả về danh sách 5 danh mục
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Ném lỗi nếu có vấn đề xảy ra
    }
};



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
const checkCategoryExists = async (nameCategory) => {
    try {
        // Giả sử bạn có một hàm truy vấn cơ sở dữ liệu để tìm danh mục theo tên
        const category = await Category.findOne({ where: { nameCategory } });
        return category !== null; // Trả về true nếu tìm thấy danh mục, ngược lại trả về false
    } catch (error) {
        console.error("Error in checkCategoryExists:", error);
        throw error;
    }
};
const checkCategoryHasChildren = async (id) => {
    try {
        // Tìm tất cả danh mục con trực tiếp của danh mục hiện tại
        const children = await Category.findAll({
            where: { parentId: id }
        });

        // Nếu có danh mục con trực tiếp, trả về true
        if (children.length > 0) {
            return true;
        }

        // Kiểm tra đệ quy từng danh mục con
        for (const child of children) {
            const hasChildren = await checkCategoryHasChildren(child.id); // Kiểm tra danh mục con của danh mục con
            if (hasChildren) {
                return true; // Nếu có danh mục con ở bất kỳ cấp độ nào, trả về true
            }
        }

        // Nếu không có danh mục con ở bất kỳ cấp độ nào, trả về false
        return false;
    } catch (error) {
        console.error("Error checking category children:", error);
        throw error;
    }
};
const createCategory = async ({ body }) => {
    // Kiểm tra nếu body là undefined hoặc null
    if (!body) {
        throw new Error("Body is required!");
    }

    // Kiểm tra nếu body.nameCategory tồn tại
    if (body.nameCategory) {
        const slug = convertToSlug(body.nameCategory);
        body.slug = slug;
    }

    // Tạo danh mục mới
    const category = await Category.create(body);

    return category;
};

const updateCategory = async ({ id, ...body }) => {
    try {
        // Kiểm tra xem body.nameCategory có tồn tại không
        if (body.nameCategory) {
            const slug = convertToSlug(body.nameCategory);
            body.slug = slug;
        }

        const [updatedCount] = await Category.update(body, {
            where: { id }
        });

        return updatedCount; // Trả về số lượng bản ghi được cập nhật
    } catch (error) {
        console.error("Error updating category:", error);
        throw error; // Ném lỗi để xử lý ở tầng cao hơn
    }
};
const removeCategoryById = async (id) => {
    try {
        const deletedCount = await Category.destroy({
            where: { id }
        });

        return deletedCount; // Trả về số lượng bản ghi bị xóa
    }catch ( error) {
        console.error("Error deleting category:", error);
        throw error;
    }
}
const updateStatusCategory = async ({ id, status }) => {

    if (status <= 0) {
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
    getAllCategory_User, getAllCategory_Admin, getCategoryByUser, checkCategoryExists, checkCategoryHasChildren, removeCategoryById,
    getCategoryById, getChildrenCategory, getAllCategoryIds, getDeviceByCategorySlug,
    createCategory, updateCategory, updateStatusCategory
}