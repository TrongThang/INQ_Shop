const express = require('express');
const {
    getLoginAPI,
    getAccountByIdAPI,
    createAccountAPI,
    updateAccountAPI,

} = require('../controllers/api/AccountController');
const routerAccount = express.Router();

routerAccount.get('/login', getLoginAPI);  
routerAccount.get('/:id', getAccountByIdAPI);  
routerAccount.post('/', createAccountAPI);  
routerAccount.put('/:id', updateAccountAPI);   

module.exports = routerAccount;