const express = require('express')

const {
    getReviewForCustomerAPI,
    getAllDeviceByUserAPI, getAllDeviceByAdminAPI, getAllDevice_NewAPI, getAllDevice_BestSellingAPI,
    getAllDevice_FeaturedAPI, 
    getDeviceBySlugAPI, getTOPDeviceLikedAPI,
    postCreateDeviceAPI, putUpdateDeviceAPI, updateStatusDeviceAPI,
    putIncreaseViewDeviceAPI,
    
    postCreateReviewForDeviceAPI,
    putUpdateReviewForDeviceAPI,
    getAllReviewForDeviceAPI,
} = require('../controllers/api/DeviceController')

const routerDevice = express.Router();

routerDevice.get('/admin', getAllDeviceByAdminAPI);
routerDevice.get('/featured', getAllDevice_FeaturedAPI);
routerDevice.get('/new', getAllDevice_NewAPI);
routerDevice.get('/bestselling', getAllDevice_BestSellingAPI);


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