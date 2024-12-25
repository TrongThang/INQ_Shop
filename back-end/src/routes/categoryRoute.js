const express = require('express');
const {
    getAllCategory_UserAPI, getAllCategory_AdminAPI, 
    getCategoryByIdAPI, getChildrenCategoryAPI,
    postCreateCategoryAPI, putUpdateCategoryAPI,
    updateStatusCategoryAPI
} = require('../controllers/api/CategoryController');
const routerCategory = express.Router();


routerCategory.get('/', getAllCategory_UserAPI);
routerCategory.get('/admin', getAllCategory_AdminAPI);

module.exports = routerCategory;