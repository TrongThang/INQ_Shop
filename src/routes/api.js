const express = require('express');
const {
    getAllCategoryAPI
} = require('../controllers/api/CategoryController');
const routerCategory = express.Router();


routerCategory.get('/', getAllCategoryAPI);

module.exports = routerCategory;