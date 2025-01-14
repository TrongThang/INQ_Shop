const Category = require('../../models/Category.js');

const {
    getAllCategory_User, getCategoryByUser, getAllCategory_Admin, checkCategoryExists, checkCategoryHasChildren, removeCategoryById,
    getCategoryById, getChildrenCategory, getDeviceByCategorySlug,
    createCategory, updateCategory, updateStatusCategory
} = require('../../services/CategoryServices.js');

const {
} = require('../../services/AttributeServices.js')
const getAllCategory_UserAPI = async (req, res) => {
    try {
        const results = await getAllCategory_User();

        console.log('Category API: ', results);
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

        console.log('Category API: ', results);
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


        // Nếu tên danh mục chưa tồn tại, tạo danh mục mới
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


const putUpdateCategoryAPI = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ route parameter
        if (!id) {
            return res.status(400).json({
                errorCode: 1,
                msg: "Thiếu thông tin id danh mục!"
            });
        }
        // Kiểm tra xem danh mục có danh mục con không (đệ quy)
        const hasChildren = await checkCategoryHasChildren(id);
        if (hasChildren && req.body.parentId) {
            return res.status(400).json({
                errorCode: 1,
                msg: "Không thể cập nhật vì danh mục này có danh mục con!"
            });
        }

        // Cập nhật danh mục
        const updatedCount = await updateCategory({ id, ...req.body });
        if (updatedCount > 0) {
            return res.status(200).json({
                errorCode: 0,
                msg: "Cập nhật thông tin thành công!"
            });
        } else {
            return res.status(404).json({
                errorCode: 1,
                msg: "Không tìm thấy danh mục để cập nhật!"
            });
        }
    } catch (error) {
        console.error("Error in putUpdateCategoryAPI:", error);
        return res.status(500).json({
            errorCode: 1,
            msg: "Cập nhật thông tin thất bại!"
        });
    }
};
const removeCategoryByIdAPI = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                errorCode: 1,
                msg: "Thiếu thông tin id danh mục!"
            });
        }
        const hasChildren = await checkCategoryHasChildren(id);
        if (hasChildren) {
            return res.status(400).json({
                errorCode: 1,
                msg: "Không thể xóa vì danh mục này có danh mục con!"
            });
        }
        const countDelete = await removeCategoryById(id);
        if (countDelete > 0) {
            return res.status(200).json({
                errorCode: 0,
                msg: "Xóa danh mục thành công!"
            });
        } else {
            return res.status(404).json({
                errorCode: 1,
                msg: "Không tìm thấy danh mục để xóa!"
            });
        }
    } catch (error) {
        console.error("Error in removeCategoryByIdAPI:", error);
        return res.status(500).json({
            errorCode: 1,
            msg: "Xóa danh mục thất bại!"
        });
    }
}
const updateStatusCategoryAPI = async (req, res) => {
    const countUpdateCategory = await updateStatusCategory(req.body);
    const countUpdateAttribute = await updateStatusCategory(req.body);

    if (updatedCount) {
        return res.status(201).json({
            errorCode: 0,
            msg: "Cập nhật trạng thái thành công!"
        })
    }

    return res.status(500).json({
        errorCode: 1,
        msg: "Cập nhật trạng thái thất bại!"
    })
}


module.exports = {
    getAllCategory_UserAPI, getAllCategory_AdminAPI, getCategoryByUserAPI,
    getCategoryByIdAPI, getChildrenCategoryAPI, getDeviceByCategorySlugAPI,
    postCreateCategoryAPI, putUpdateCategoryAPI,
    updateStatusCategoryAPI,
    removeCategoryByIdAPI,

}