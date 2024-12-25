const Category = require('../../models/Category.js');

const {
    getAllCategory_User, getAllCategory_Admin,
    getCategoryById, getChildrenCategory,
    createCategory, updateCategory, deleteCategory
} = require('../../services/CategoryServices.js');

const getAllCategory_UserAPI = async (req, res) => {
    const results = await getAllCategory_User();

    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

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

//FIX
const getChildrenCategoryAPI = async (req, res) => {
    const results = await getChildrenCategory(req.body.id);

    return res.status(200).json({
        errorCode: 0,
        data: results
    })
};

const postCreateCategoryAPI = async (req, res) => {
    const category = await createCategory(req.body);

    return res.status(201).json({
        errorCode: 0,
        data: category
    })
}

const putUpdateCategoryAPI = async (req, res) => {
    const updatedCount = await updateCategory(req.body);

    if (updateCategory)
    {
        return res.status(201).json({
            errorCode: 0,
            msg: "Cập nhật thông tin thành công!"
        })
    }

    return res.status(500).json({
        errorCode: 1,
        msg: "Cập nhật thông tin thất bại!"
    })
}

const updateStatusCategoryAPI = async (req, res) => {
    const updatedCount = await updateStatusCategory(req.body);

    if (updateCategory)
    {
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
    getAllCategory_UserAPI, getAllCategory_AdminAPI, 
    getCategoryByIdAPI, getChildrenCategoryAPI,
    postCreateCategoryAPI, putUpdateCategoryAPI,
    updateStatusCategoryAPI
}