const express = require('express');
const {
    getAllCustomersAPI,
    getCustomerByIdAPI,
    postCreateCustomerAPI,
    putUpdateCustomerAPI,
    statusCustomerAPI,
} = require('../controllers/api/CustomerController');
const routerCustomer = express.Router();


routerCustomer.get('/', getAllCustomersAPI);  //
routerCustomer.get('/:id', getCustomerByIdAPI); //

routerCustomer.post('/', postCreateCustomerAPI);  ///
routerCustomer.put('/:id', putUpdateCustomerAPI);  //
routerCustomer.put('/status/:id', statusCustomerAPI);   //


module.exports = routerCustomer;