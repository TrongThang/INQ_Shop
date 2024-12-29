const express = require('express');
const {
    getCartAllCartOrOneCart,
    postAddDeviceToCartAPI,
    putUpdateDeviceInCartAPI,
    removeAllCartOrOneCart
} = require('../controllers/api/CartController');  

const routerCartDatabaseRoute = express.Router();

routerCartDatabaseRoute.get('/', getCartAllCartOrOneCart);

routerCartDatabaseRoute.post('/', postAddDeviceToCartAPI);

routerCartDatabaseRoute.put('/', putUpdateDeviceInCartAPI);

routerCartDatabaseRoute.delete('/', removeAllCartOrOneCart);


module.exports = routerCartDatabaseRoute;
