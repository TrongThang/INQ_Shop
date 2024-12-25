const express = require('express');
const {
    getAllCustomersAPI,
    getCustomerByIdAPI,
    postCreateCustomerAPI,
    putUpdateCustomerAPI,
    deleteCustomerAPI,
} = require('../controllers/api/CustomerController');
const routerCustomer = express.Router();


routerCustomer.get('/', getAllCustomersAPI);  //
routerCustomer.get('/:id', getCustomerByIdAPI); //

routerCustomer.post('/', postCreateCustomerAPI);  ///
routerCustomer.put('/:id', putUpdateCustomerAPI);  //
routerCustomer.delete('/:id', deleteCustomerAPI);   //


module.exports = routerCustomer;