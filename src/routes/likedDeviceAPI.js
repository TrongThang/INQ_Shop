const express = require('express');
const {
    getAllLikedDeviceAPI,
    postAddToLikedDeviceAPI,
    removeAllOrSingleLikedDeviceAPI
} = require('../controllers/api/LikedDeviceController');
const routerLikedDevice = express.Router();


routerLikedDevice.get('/', getAllLikedDeviceAPI );
routerLikedDevice.post('/', postAddToLikedDeviceAPI);
routerLikedDevice.delete('/', removeAllOrSingleLikedDeviceAPI);

module.exports = routerLikedDevice;