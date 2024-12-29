const express = require('express')

const {
    getAllDeviceByUserAPI, getAllDeviceByAdminAPI,
    getDeviceByIdAPI, getTOPDeviceLikedAPI,
    postCreateDeviceAPI, putUpdateDeviceAPI, updateStatusDeviceAPI,
} = require('../controllers/api/DeviceController')

const routerDevice = express.Router();

routerDevice.get('/admin', getAllDeviceByAdminAPI);
routerDevice.get('/', getAllDeviceByUserAPI);
routerDevice.get('/', getDeviceByIdAPI);
routerDevice.get('/top-device', getTOPDeviceLikedAPI);
// router.get('/', getBlogAPI);
// router.get('/', getAllBlogAPI);
routerDevice.post('/', postCreateDeviceAPI)
routerDevice.put('/', putUpdateDeviceAPI)
routerDevice.delete('/', putUpdateDeviceAPI)



module.exports = routerDevice;