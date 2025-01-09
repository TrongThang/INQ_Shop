const express = require('express');
const {
    getAllLikedDeviceAPI,
    getLikedDeviceAPI,
    postAddToLikedDeviceAPI,
    removeLikedDeviceAPI,
    removeAllLikedDeviceAPI,
} = require('../controllers/api/LikedDeviceController');
const routerLikedDevice = express.Router();


routerLikedDevice.get('/:idCustomer', getAllLikedDeviceAPI );
routerLikedDevice.get('/:idCustomer/:idDevice', getLikedDeviceAPI );
routerLikedDevice.post('/', postAddToLikedDeviceAPI);
routerLikedDevice.delete('/:idCustomer/:idDevice', removeLikedDeviceAPI);

module.exports = routerLikedDevice;