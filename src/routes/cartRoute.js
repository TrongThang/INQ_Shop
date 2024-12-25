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


//Database
cartRouter.get('/', getAllInCartAPI);
cartRouter.get('/:idCustomer',getCartAPI)
cartRouter.post('/cart', postAddDeviceToCartAPI);
cartRouter.put('/cart/:idCustomer/:idDevice', putUpdateDeviceInCartAPI);
cartRouter.delete('/cart/:idCustomer/:idDevice', removeDeviceInCartAPI);
cartRouter.delete('/cart/:idCustomer', removeAllDeviceInCartAPI);

module.exports = cartRouter;