const express = require('express');
const {
    getAllAccountsAPI,
    getAccountByIdAPI,
    createAccountAPI,
    updateAccountAPI,
    softDeleteAccountAPI
} = require('../controllers/api/AccountController');
const routerAccount = express.Router();


routerAccount.get('/', getAllAccountsAPI);   //
routerAccount.get('/:id', getAccountByIdAPI);   //
routerAccount.post('/', createAccountAPI);  ///
routerAccount.put('/:id', updateAccountAPI);   //
routerAccount.delete('/', softDeleteAccountAPI);  //


module.exports = routerAccount;