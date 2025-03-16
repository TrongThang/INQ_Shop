const express = require('express');
const {
    getLoginAPI,
    getAccountByIdAPI,
    checkLoginAPI,
    logoutAPI,
    createAccountAPI,
    updateAccountAPI,

} = require('../controllers/api/AccountController');
const routerAccount = express.Router();

routerAccount.post('/login', getLoginAPI);  
routerAccount.get('/check-login', checkLoginAPI);  
routerAccount.post('/logout', logoutAPI);
routerAccount.post('/', createAccountAPI);  
routerAccount.put('/:id', updateAccountAPI);   

module.exports = routerAccount;