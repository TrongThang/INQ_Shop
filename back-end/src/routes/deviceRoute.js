const express = require('express')

const {
    getReviewForCustomerAPI,
    getAllDeviceByUserAPI, getAllDeviceByAdminAPI, getAllDevice_NewAPI, getTopSellingDeviceAPI,
    getAllDevice_FeaturedAPI, getAllDevice_DiscountAPI,getDevice_byCategoryAPI,
    
    getDeviceBySlugAPI, getTOPDeviceLikedAPI,
    postCreateDeviceAPI, putUpdateDeviceAPI, updateStatusDeviceAPI,
    putIncreaseViewDeviceAPI,
    
    postCreateReviewForDeviceAPI,
    putUpdateReviewForDeviceAPI,
    getAllReviewForDeviceAPI,
} = require('../controllers/api/DeviceController')

const routerDevice = express.Router();

routerDevice.get('/admin', getAllDeviceByAdminAPI);
routerDevice.get('/related-device/:idCategory', getDevice_byCategoryAPI);

routerDevice.get('/featured', getAllDevice_FeaturedAPI);
routerDevice.get('/new', getAllDevice_NewAPI);
routerDevice.get('/bestselling', getTopSellingDeviceAPI);
routerDevice.get('/discount', getAllDevice_DiscountAPI);



routerDevice.get('/', getAllDeviceByUserAPI);
routerDevice.get('/:keyword', getAllDeviceByUserAPI);

routerDevice.get('/detail/:slug', getDeviceBySlugAPI);
routerDevice.get('/top-device', getTOPDeviceLikedAPI);

routerDevice.post('/', postCreateDeviceAPI)
routerDevice.put('/', putUpdateDeviceAPI)
routerDevice.delete('/', putUpdateDeviceAPI)

routerDevice.put('/views/:idDevice', putIncreaseViewDeviceAPI)

routerDevice.get('/review/:idDevice/:idCustomer', getReviewForCustomerAPI)
routerDevice.get('/reviews/:idDevice', getAllReviewForDeviceAPI)
routerDevice.post('/review/',postCreateReviewForDeviceAPI)
routerDevice.put('/review/',putUpdateReviewForDeviceAPI)

module.exports = routerDevice;