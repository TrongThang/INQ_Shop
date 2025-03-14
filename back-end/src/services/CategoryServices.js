const { Sequelize, Op, where } = require('sequelize');
const { convertToSlug } = require('../helpers/string');
const Category = require('../models/Category');
const Device = require('../models/Device');
const Blog = require('../models/Blog')
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
    try {
        const rawData = await Category.findAll();
        // Chuyển đổi chỉ lấy dataValues
        const data = rawData.map((item) => item.dataValues);

        // Nhóm danh mục sau khi làm sạch dữ liệu
        const results = groupCategoriesByListCategories(data);
        return results; // Trả về kết quả đã nhóm
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch categories');
    }
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


//xử lý thêm danh mục - services
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
//xử lý cập nhật danh mục - services
const updateCategory = async ({ id, ...data }) => {
    try {
        // Nếu có nameCategory, tạo slug
        if (data.nameCategory) {
            const slug = convertToSlug(data.nameCategory);
            data.slug = slug;
        }

        // Lấy thông tin danh mục hiện tại
        const currentCategory = await Category.findOne({
            where: { id }
        });

        if (!currentCategory) {
            console.log("Không tìm thấy danh mục!");
            return 0; // Dừng cập nhật nếu không tìm thấy danh mục
        }

        // Kiểm tra danh mục cha lớn nhất nếu danh mục hiện tại có parentId
        let rootParent = currentCategory; // Mặc định là chính nó nếu không có parentId
        if (currentCategory.parentId) {
            rootParent = await findRootParent(currentCategory);
        }

        // Kiểm tra logic cập nhật danh mục con
        if (currentCategory.parentId && rootParent.status === 0 && Number(data.status) === 1) {
            console.log("Danh mục cha lớn nhất bị vô hiệu hóa, không thể cập nhật trạng thái của danh mục con!");
            return 0; // Ngừng cập nhật nếu danh mục cha lớn nhất bị vô hiệu hóa
        }

        // Thực hiện cập nhật trạng thái chỉ cho danh mục hiện tại
        const [updatedCount] = await Category.update(data, {
            where: { id }
        });

        if (updatedCount === 0) {
            console.log("Không có thay đổi nào được thực hiện!");
            return 0;
        }


        await Device.update(
            { status: data.status },
            { where: { idCategory: id } }
        );

        // Vô hiệu hóa hoặc kích hoạt blog liên quan
        await Blog.update(
            { status: data.status },
            { where: { idCategory: id } }
        );
        console.log("Cập nhật thành công!");
        return updatedCount;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

// Hàm tìm danh mục cha lớn nhất
const findRootParent = async (category) => {
    if (!category.parentId) {
        return category; // Đây là danh mục cha lớn nhất
    }
    const parentCategory = await Category.findOne({
        where: { id: category.parentId }
    });
    return findRootParent(parentCategory);
};
//xử lý cập nhật trạng thái - services
const updateStatusCategory = async ({ id, status }) => {
    try {
        // Xác định giá trị của `isHide`
        const isHide = status === 0 ? true : false;

        // Lấy thông tin danh mục cha
        const parentCategory = await Category.findOne({ where: { id } });
        if (!parentCategory) {
            console.log("Không tìm thấy danh mục!");
            return 0; // Trả về 0 nếu không tìm thấy danh mục
        }

        // Kiểm tra xem danh mục có con hay không
        const hasChildren = await Category.findAll({ where: { parentId: id } });
        console.log("Data", hasChildren)
        // Nếu danh mục có con và danh mục cha đang bị vô hiệu hóa (status = 0)
        if (hasChildren.length > 0 && parentCategory.status === 0 && status === 0) {
            console.log("Danh mục cha đang bị vô hiệu hóa và có con, không thể cập nhật trạng thái về 0!");
            return 0; // Trả về 0 nếu cố gắng vô hiệu hóa danh mục cha đang bị vô hiệu hóa
        }

        // Cập nhật trạng thái và `isHide` của danh mục cha
        const [updatedCount] = await Category.update(
            {
                status: status,
                isHide: isHide,
            },
            {
                where: { id },
            }
        );
        // Nếu danh mục cha được cập nhật thành công
        if (updatedCount > 0) {
            console.log("Status nhận được:", status);
            // Nếu danh mục cha bị vô hiệu hóa (status = 0), cập nhật trạng thái của các danh mục con
            if (status == 0 && hasChildren.length > 0) {

                // Hàm đệ quy để cập nhật trạng thái của tất cả các danh mục con
                const updateChildrenStatus = async (parentId) => {
                    // Lấy tất cả các danh mục con của danh mục hiện tại
                    const children = await Category.findAll({
                        where: { parentId: parentId },
                    });

                    // Duyệt qua từng danh mục con và cập nhật trạng thái
                    for (const child of children) {
                        await Category.update(
                            { status: status, isHide: isHide },
                            { where: { id: child.id } }
                        );

                        console.log(`Đã cập nhật trạng thái và isHide của danh mục con có id = ${child.id}`);

                        // Gọi đệ quy để cập nhật trạng thái của các danh mục con của danh mục con hiện tại
                        await updateChildrenStatus(child.id);
                    }
                };

                // Bắt đầu đệ quy từ danh mục cha
                await updateChildrenStatus(id);
            }

            // Vô hiệu hóa hoặc kích hoạt thiết bị liên quan
            await Device.update(
                { status: status },
                { where: { idCategory: id } }
            );

            // Vô hiệu hóa hoặc kích hoạt blog liên quan
            await Blog.update(
                { status: status },
                { where: { idCategory: id } }
            );
        }
        console.log("update sau", updatedCount);

        return updatedCount; // Trả về số lượng bản ghi được cập nhật
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái danh mục:", error);
        throw error; // Ném lỗi để xử lý ở tầng trên
    }
};
module.exports = {
    getAllCategory_User, getAllCategory_Admin, getCategoryByUser, checkCategoryExists,
    getCategoryById, getChildrenCategory, getAllCategoryIds, getDeviceByCategorySlug,
    createCategory, updateCategory, updateStatusCategory
}