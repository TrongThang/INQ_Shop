const { convertToSlug } = require('../helpers/stringHelper');
const Category = require('../models/Category');
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

const getChildrenCategory = async (parenId) => {
    return await Category.findAll({
        where: { parenId: parenId },
    });
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
    getCategoryById, getChildrenCategory,
    createCategory, updateCategory, updateStatusCategory
}