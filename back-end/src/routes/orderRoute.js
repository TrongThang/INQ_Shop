const express = require('express');

const {
    checkCustomerOrderForDeviceAPI,
    getAllOrderByIdCustomerAPI,
    postCreateOrderAPI, putUpdateStatusOrderAPI
} = require('../controllers/api/OrderController');
const routerOrder = express.Router();

routerOrder.get('/checkOrder/:idCustomer/:idDevice', checkCustomerOrderForDeviceAPI);
routerOrder.get('/:id', getAllOrderByIdCustomerAPI);

routerOrder.post('/checkout', postCreateOrderAPI);
routerOrder.put('/', putUpdateStatusOrderAPI);

module.exports = routerOrder;
