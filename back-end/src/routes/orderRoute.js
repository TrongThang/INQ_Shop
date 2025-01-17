const express = require('express');

const {
    checkCustomerOrderForDeviceAPI,
    getAllOrderByIdCustomerAPI,
    getAllOrderAPI,
    getOrderByIdOrderAPI,
    putUpdateStatusOrderAPI,
    putUpdateStatusOrderAdminAPI,
    putUpdateOrderAPI,
    postCreateOrderAPI, 
    getAllOrder_RevenueStatisticsAPI
} = require('../controllers/api/OrderController');
const routerOrder = express.Router();


// routerOrder.get('/:id', getAllOrderByIdCustomerAPI );
// routerOrder.post('/', postAddOrderAPI);
//USER
routerOrder.get('/revenueStatistics', getAllOrder_RevenueStatisticsAPI);
routerOrder.get('/checkOrder/:idCustomer/:idDevice', checkCustomerOrderForDeviceAPI);
routerOrder.get('/:id', getAllOrderByIdCustomerAPI );
routerOrder.put('/', putUpdateStatusOrderAPI);
//ADMIN
routerOrder.get('/', getAllOrderAPI);
routerOrder.get('/admin/:idOrder', getOrderByIdOrderAPI);
// routerOrder.put('/', putUpdateOrderAPI);
// routerOrder.put('/status', putUpdateStatusOrderAPI);

routerOrder.post('/checkout', postCreateOrderAPI);
routerOrder.put('/admin/:id', putUpdateOrderAPI);
routerOrder.put('/admin', putUpdateStatusOrderAdminAPI);

module.exports = routerOrder;
