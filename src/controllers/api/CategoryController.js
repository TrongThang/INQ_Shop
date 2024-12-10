const Category = require('../../models/Category.js');

const { getAllCategory_User, getAllCategory_Admin, getCategoryById } = require('../../services/CategoryServices.js');

const getAllCategoryAPI = async (req, res) => {
    //TO DO SOMETHING
    const results = await getAllCategory_User();

    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

const getCategoryAPI = async (req, res) => {
    //TO DO SOMETHING
};

const postCreateCategoryAPI = async (req, res) => {
    //TO DO SOMETHING
}

const putUpdateCategoryAPI = async (req, res) => {
    //TO DO SOMETHING
}

const deteleCategoryAPI = async (req, res) => {
    //TO DO SOMETHING
}
    
module.exports = {
    getAllCategoryAPI
}