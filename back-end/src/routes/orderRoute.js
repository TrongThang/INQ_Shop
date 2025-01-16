const express = require('express');
const {
    checkCustomerOrderForDeviceAPI,
    getAllOrderByIdCustomerAPI,
    postAddOrderAPI,
    putUpdateOrderAPI,
    putUpdateStatusOrderAPI,
    getAllOrder_RevenueStatisticsAPI
} = require('../controllers/api/OrderController');
const routerOrder = express.Router();


// routerOrder.get('/:id', getAllOrderByIdCustomerAPI );
// routerOrder.post('/', postAddOrderAPI);
routerOrder.get('/revenueStatistics', getAllOrder_RevenueStatisticsAPI);
routerOrder.get('/checkOrder/:idCustomer/:idDevice', checkCustomerOrderForDeviceAPI);
routerOrder.get('/:id', getAllOrderByIdCustomerAPI );

// routerOrder.put('/', putUpdateOrderAPI);
// routerOrder.put('/status', putUpdateStatusOrderAPI);

module.exports = routerOrder;
