const express = require('express');
const {
    getCartAPI,
    postAddToCartAPI, putUpdateQuantityDeviceInCartAPI,
    removeDeviceInCartCookieAPI,removeAllDeviceInCartAPI
} = require('../controllers/api/CartController');

const cartRouter = express.Router();


cartRouter.get('/', getCartAPI);
cartRouter.get('/:idCustomer',getCartAPI)
cartRouter.post('/', postAddToCartAPI);
cartRouter.put('/:idCustomer/:idDevice', putUpdateQuantityDeviceInCartAPI);
cartRouter.delete('/:idCustomer/:idDevice', removeDeviceInCartCookieAPI);
cartRouter.delete('/:idCustomer', removeAllDeviceInCartAPI);

module.exports = cartRouter;