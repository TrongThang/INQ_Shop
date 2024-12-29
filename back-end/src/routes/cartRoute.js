const express = require('express');
const {
    getCartInCookieAPI, addToCartAPI, 
    updateQuantityDeviceInCartAPI, removeDeviceInCartAPI,
    removeAllDeviceInCartAPI
} = require('../controllers/api/CartController');

const cartRouter = express.Router();


cartRouter.get('/', getCartInCookieAPI);
// cartRouter.post('/', addToCartAPI);
// cartRouter.put('/', updateQuantityDeviceInCartAPI);
cartRouter.delete('/', removeDeviceInCartAPI);
cartRouter.delete('/clear', removeAllDeviceInCartAPI);

module.exports = cartRouter;