const express = require('express');
const {
    checkCustomerOrderForDeviceAPI,
    getAllOrderByIdCustomerAPI,
    postAddOrderAPI,
    putUpdateOrderAPI,
    putUpdateStatusOrderAPI,
} = require('../controllers/api/OrderController');
const routerOrder = express.Router();


// routerOrder.get('/:id', getAllOrderByIdCustomerAPI );
// routerOrder.post('/', postAddOrderAPI);

routerOrder.get('/checkOrder/:idCustomer/:idDevice', checkCustomerOrderForDeviceAPI);

// routerOrder.put('/', putUpdateOrderAPI);
// routerOrder.put('/status', putUpdateStatusOrderAPI);

module.exports = routerOrder;
