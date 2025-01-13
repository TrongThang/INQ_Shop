const express = require('express');

const {
    checkCustomerOrderForDeviceAPI,
    getAllOrderByIdCustomerAPI,
    postCreateOrderAPI,
} = require('../controllers/api/OrderController');
const routerOrder = express.Router();


// routerOrder.get('/:id', getAllOrderByIdCustomerAPI );

routerOrder.get('/checkOrder/:idCustomer/:idDevice', checkCustomerOrderForDeviceAPI);
routerOrder.get('/:id', getAllOrderByIdCustomerAPI);

routerOrder.post('/checkout', postCreateOrderAPI);
// routerOrder.put('/', putUpdateOrderAPI);
// routerOrder.put('/status', putUpdateStatusOrderAPI);

module.exports = routerOrder;
