const express = require('express');
const {
    getCartAPI,
    postAddToCartAPI, putUpdateQuantityDeviceInCartAPI,
    removeDeviceInCartAPI,removeAllDeviceInCartAPI
} = require('../controllers/api/CartController');

const cartRouter = express.Router();

// cartRouter.get('/', getCartAPI);
cartRouter.get('/:idCustomer',getCartAPI)
cartRouter.post('/', postAddToCartAPI);
cartRouter.put('/', putUpdateQuantityDeviceInCartAPI);
cartRouter.delete('/:idCustomer/:idDevice', removeDeviceInCartAPI);
cartRouter.delete('/:idCustomer', removeAllDeviceInCartAPI);

module.exports = cartRouter;