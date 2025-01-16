const express = require('express')

const {
    getReviewForCustomerAPI,
    getAllDeviceByUserAPI, getAllDeviceByAdminAPI, getAllDevice_NewAPI, getTopSellingDeviceAPI,
    getAllDevice_FeaturedAPI, getAllDevice_DiscountAPI,
    
    getDeviceBySlugAPI, getTOPDeviceLikedAPI,
    postCreateDeviceAPI, putUpdateDeviceAPI, updateStatusDeviceAPI,
    putIncreaseViewDeviceAPI, 
    getDeviceBySlugForAdminAPI, getCheckNameDeviceAPI,
    
    postCreateReviewForDeviceAPI,
    putUpdateReviewForDeviceAPI,
    getAllReviewForDeviceAPI,
    postCheckDeviceModificationAPI,
    postCheckListDeviceAPI
} = require('../controllers/api/DeviceController')

const routerDevice = express.Router();

routerDevice.get('/admin', getAllDeviceByAdminAPI);
routerDevice.get('/featured', getAllDevice_FeaturedAPI);
routerDevice.get('/new', getAllDevice_NewAPI);
routerDevice.get('/bestselling', getTopSellingDeviceAPI);
routerDevice.get('/discount', getAllDevice_DiscountAPI);
routerDevice.get('/top-device', getTOPDeviceLikedAPI);


routerDevice.get('/check-name/:name', getCheckNameDeviceAPI);

routerDevice.get('/', getAllDeviceByUserAPI);
routerDevice.get('/search/', getAllDeviceByUserAPI);

routerDevice.post('/check/', postCheckDeviceModificationAPI);

routerDevice.post('/check-list', postCheckListDeviceAPI);


routerDevice.get('/detail/:slug', getDeviceBySlugAPI);

routerDevice.post('/', postCreateDeviceAPI)
routerDevice.put('/', putUpdateDeviceAPI)
routerDevice.delete('/', putUpdateDeviceAPI)

routerDevice.put('/views/:idDevice', putIncreaseViewDeviceAPI)

routerDevice.get('/review/:idDevice/:idCustomer', getReviewForCustomerAPI)
routerDevice.get('/reviews/:idDevice', getAllReviewForDeviceAPI)
routerDevice.post('/review/',postCreateReviewForDeviceAPI)
routerDevice.put('/review/',putUpdateReviewForDeviceAPI)

routerDevice.get('/admin/detail/:slug', getDeviceBySlugForAdminAPI)

module.exports = routerDevice;