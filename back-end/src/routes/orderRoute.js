const express = require('express');

const {
    checkCustomerOrderForDeviceAPI,
    getAllOrderByIdCustomerAPI,
    getAllOrderAPI,
    getOrderByIdOrderAPI,
    putUpdateStatusOrderAPI,
    postCreateOrderAPI, 
} = require('../controllers/api/OrderController');
const routerOrder = express.Router();


// routerOrder.get('/:id', getAllOrderByIdCustomerAPI );
// routerOrder.post('/', postAddOrderAPI);
//USER
routerOrder.get('/checkOrder/:idCustomer/:idDevice', checkCustomerOrderForDeviceAPI);
routerOrder.get('/:id', getAllOrderByIdCustomerAPI );
//ADMIN
routerOrder.get('/', getAllOrderAPI);
routerOrder.get('/admin/:idOrder', getOrderByIdOrderAPI);
// routerOrder.put('/', putUpdateOrderAPI);
// routerOrder.put('/status', putUpdateStatusOrderAPI);

routerOrder.post('/checkout', postCreateOrderAPI);
routerOrder.put('/', putUpdateStatusOrderAPI);

module.exports = routerOrder;
