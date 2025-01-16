const Category = require('../../models/Category.js');

const {
    getAllCategory_User, getCategoryByUser, getAllCategory_Admin, checkCategoryExists,
    getCategoryById, getChildrenCategory, getDeviceByCategorySlug,
    createCategory, updateCategory, updateStatusCategory
} = require('../../services/CategoryServices.js');

const {
} = require('../../services/AttributeServices.js')
const getAllCategory_UserAPI = async (req, res) => {
    try {
        const results = await getAllCategory_User();

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(401).json({
            errorCode: 1,
            error: error
        })
    }

}
const getCategoryByUserAPI = async (req, res) => {
    try {
        const results = await getCategoryByUser();

        return res.status(200).json({
            errorCode: 0,
            data: results
        })
    } catch (error) {
        return res.status(401).json({
            errorCode: 1,
            error: error
        })
    }

}

const getDeviceByCategorySlugAPI = async (req, res) => {
    try {
        console.log(req.params.slug);
        const results = await getDeviceByCategorySlug(req.params.slug);

        return res.status(200).json(results)
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình lấy dữ liệu Thiết bị',
            details: error.message,
        });
    }
};


const getAllCategory_AdminAPI = async (req, res) => {
    const results = await getAllCategory_Admin();

    return res.status(200).json({
        errorCode: 0,
        data: results
    })
};

const getCategoryByIdAPI = async (req, res) => {
    const results = await getCategoryById(req.params.id);

    return res.status(200).json({
        errorCode: 0,
        data: results
    })
};

const getChildrenCategoryAPI = async (req, res) => {
    const results = await getChildrenCategory(req.body.id);

    return res.status(200).json({
        errorCode: 0,
        data: results
    })
};

//xử lý thêm danh mục - controllers
const postCreateCategoryAPI = async (req, res) => {
    try {
        const { nameCategory } = req.body; // Lấy tên danh mục từ request body

        // Kiểm tra xem tên danh mục đã tồn tại chưa
        const existingCategory = await checkCategoryExists(nameCategory);
        if (existingCategory) {
            return res.status(400).json({
                errorCode: 1,
                msg: "Tên danh mục đã tồn tại!"
            });
        }
        const category = await createCategory({ body: req.body });
        return res.status(201).json({
            errorCode: 0,
            data: category
        });
    } catch (error) {
        console.error("Error in postCreateCategoryAPI:", error);
        return res.status(500).json({
            errorCode: 1,
            msg: "Tạo danh mục thất bại!"
        });
    }
};

//xử lý cập nhật danh mục - controllers
const putUpdateCategoryAPI = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ route parameter
        const data = req.body;

        if (!id) {
            return res.status(400).json({
                errorCode: 1,
                msg: "Thiếu thông tin id danh mục!"
            });
        }
        
        // Cập nhật danh mục
        const updatedCount = await updateCategory({ id, ...data });
        console.log("Update", updatedCount === 0)
        if (updatedCount > 0) {
            return res.status(200).json({
                errorCode: 0,
                msg: "Cập nhật thông tin thành công!"
            });
        } else if (updatedCount === 0) {
            return res.status(404).json({
                errorCode: 1,
                msg: "Danh mục cha lớn nhất bị vô hiệu hóa, không thể cập nhật trạng thái của danh mục con!"
            });

        } else {
            return res.status(404).json({
                errorCode: 2,
                msg: "Không tìm thấy danh mục để cập nhật!"
            });
        }
    } catch (error) {
        console.error("Error in putUpdateCategoryAPI:", error);
        return res.status(500).json({
            errorCode: 1,
            msg: "Tên mục đã tồn tại!"
        });
    }
};

//xử lý cập nhật trạng thái - controllers
const updateStatusCategoryAPI = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ params
        const { status } = req.body; // Lấy status từ body

        // Gọi hàm cập nhật trạng thái
        const updatedCount = await updateStatusCategory({ id, status });

        if (updatedCount > 0) {
            console.log("API - Cập nhật trạng thái thành công!");
            return res.status(200).json({
                errorCode: 0,
                msg: "Cập nhật trạng thái thành công!",
            });
        } else {
            console.log("API - Không thể cập nhật trạng thái!");
            return res.status(400).json({
                errorCode: 1,
                msg: "Không thể cập nhật trạng thái vì danh mục cha đang bị vô hiệu hóa hoặc không tìm thấy danh mục!",
            });
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái danh mục:", error);
        return res.status(500).json({
            errorCode: 1,
            msg: "Cập nhật trạng thái thất bại!",
        });
    }
};
module.exports = {
    getAllCategory_UserAPI, getAllCategory_AdminAPI, getCategoryByUserAPI,
    getCategoryByIdAPI, getChildrenCategoryAPI, getDeviceByCategorySlugAPI,
    postCreateCategoryAPI, putUpdateCategoryAPI,
    updateStatusCategoryAPI,

}