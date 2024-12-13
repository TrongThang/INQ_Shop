const express = require('express');
const router = express.Router();
const {
    getAllInCartAPI,
    getCartAPI,
    postAddDeviceToCartAPI,
    putUpdateDeviceInCartAPI,
    removeDeviceInCartAPI,
    removeAllDeviceInCartAPI
} = require('../controllers/api/CartController');  

router.get('/cart', getAllInCartAPI);

router.get('/cart/:idCustomer',getCartAPI)

router.post('/cart', postAddDeviceToCartAPI);

router.put('/cart/:idCustomer/:idDevice', putUpdateDeviceInCartAPI);

router.delete('/cart/:idCustomer/:idDevice', removeDeviceInCartAPI);

router.delete('/cart/:idCustomer', removeAllDeviceInCartAPI);

module.exports = router;
