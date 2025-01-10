const express = require('express');
const {
    getAllCategory_UserAPI, getAllCategory_AdminAPI, getCategoryByUserAPI,
    getCategoryByIdAPI, getChildrenCategoryAPI, getDeviceByCategorySlugAPI,
    postCreateCategoryAPI, putUpdateCategoryAPI,
    updateStatusCategoryAPI
} = require('../controllers/api/CategoryController');
const routerCategory = express.Router();


routerCategory.get('/', getAllCategory_UserAPI);
routerCategory.get('/take-five', getCategoryByUserAPI);
routerCategory.get('/admin', getAllCategory_AdminAPI);
routerCategory.get('/:slug', getDeviceByCategorySlugAPI);

module.exports = routerCategory;