const express = require('express');
const router = express.Router();
const {
    getCartAllCartOrOneCart,
    postAddDeviceToCartAPI,
    putUpdateDeviceInCartAPI,
    removeAllCartOrOneCart
} = require('../controllers/api/CartController');  

router.get('/', getCartAllCartOrOneCart);

router.post('/', postAddDeviceToCartAPI);

router.put('/', putUpdateDeviceInCartAPI);

router.delete('/', removeAllCartOrOneCart);


module.exports = router;
