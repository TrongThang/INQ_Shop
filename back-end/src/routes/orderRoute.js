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
const { create_payment_url, vnpay_return } = require('../services/VnPayServices');
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

routerOrder.post('/create_payment_url', create_payment_url);
routerOrder.get('/vnpay_return', vnpay_return);

module.exports = routerOrder;
