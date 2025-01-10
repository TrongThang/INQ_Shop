const express = require('express');
const {
    getAllOrderByIdCustomerAPI,
    postAddOrderAPI,
    putUpdateOrderAPI,
    putUpdateStatusOrderAPI,
} = require('../controllers/api/OrderController');
const routerOrder = express.Router();


routerOrder.get('/:id', getAllOrderByIdCustomerAPI );
// routerOrder.post('/', postAddOrderAPI);
// routerOrder.put('/', putUpdateOrderAPI);
// routerOrder.put('/status', putUpdateStatusOrderAPI);

module.exports = routerOrder;