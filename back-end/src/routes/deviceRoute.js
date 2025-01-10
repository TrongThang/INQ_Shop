const express = require('express')

const {
    getAllDeviceByUserAPI, getAllDeviceByAdminAPI, getAllDevice_NewAPI, getAllDevice_BestSellingAPI, 
    getAllDevice_DiscountAPI,getAllDevice_FeaturedAPI,
    getDeviceBySlugAPI, getTOPDeviceLikedAPI,
    postCreateDeviceAPI, putUpdateDeviceAPI, updateStatusDeviceAPI,
} = require('../controllers/api/DeviceController')

const routerDevice = express.Router();

routerDevice.get('/admin', getAllDeviceByAdminAPI);
routerDevice.get('/featured', getAllDevice_FeaturedAPI);
routerDevice.get('/new', getAllDevice_NewAPI);
routerDevice.get('/bestselling', getAllDevice_BestSellingAPI);
routerDevice.get('/discount', getAllDevice_DiscountAPI);



routerDevice.get('/', getAllDeviceByUserAPI);
routerDevice.get('/:keyword', getAllDeviceByUserAPI);

routerDevice.get('/detail/:slug', getDeviceBySlugAPI);
routerDevice.get('/top-device', getTOPDeviceLikedAPI);
// router.get('/', getBlogAPI);
// router.get('/', getAllBlogAPI);
routerDevice.post('/', postCreateDeviceAPI)
routerDevice.put('/', putUpdateDeviceAPI)
routerDevice.delete('/', putUpdateDeviceAPI)



module.exports = routerDevice;