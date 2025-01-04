const Category = require('../../models/Category.js');

const {
    getAllCategory_User, getCategoryByUser, getAllCategory_Admin,
    getCategoryById, getChildrenCategory,
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

    if (updatedCount)
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
    const countUpdateCategory = await updateStatusCategory(req.body);
    const countUpdateAttribute = await updateStatusCategory(req.body);

    if (updatedCount)
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
    getAllCategory_UserAPI, getAllCategory_AdminAPI, getCategoryByUserAPI,
    getCategoryByIdAPI, getChildrenCategoryAPI,
    postCreateCategoryAPI, putUpdateCategoryAPI,
    updateStatusCategoryAPI
}