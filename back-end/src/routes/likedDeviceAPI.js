const express = require('express');
const {
    getAllLikedDeviceAPI,
    postAddToLikedDeviceAPI,
    removeLikedDeviceAPI,
    removeAllLikedDeviceAPI,
} = require('../controllers/api/LikedDeviceController');
const routerLikedDevice = express.Router();


routerLikedDevice.get('/', getAllLikedDeviceAPI );
routerLikedDevice.get('/:idCustomer', getAllLikedDeviceAPI );
routerLikedDevice.post('/', postAddToLikedDeviceAPI);
routerLikedDevice.delete('/:idCustomer/:idDevice', removeLikedDeviceAPI);

module.exports = routerLikedDevice;