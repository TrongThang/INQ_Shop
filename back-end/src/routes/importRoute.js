const express = require('express');
const {
    getAllStockByDeviceAPI
} = require('../controllers/api/ImportController');
const importRoute = express.Router();


importRoute.get('/', getAllStockByDeviceAPI);

module.exports = importRoute;