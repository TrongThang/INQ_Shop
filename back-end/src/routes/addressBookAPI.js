const express = require('express');
const {
    getAllOrSingleAddressBookAPI,
    getAddressBooksByIdCustomerAPI,
    postCreateAddressBookAPI,
    putUpdateAddressBookAPI
} = require('../controllers/api/AddressBookController');
const routerAddressBook = express.Router();


routerAddressBook.get('/', getAllOrSingleAddressBookAPI );
routerAddressBook.get('/Customer', getAddressBooksByIdCustomerAPI );
routerAddressBook.post('/', postCreateAddressBookAPI);
routerAddressBook.put('/', putUpdateAddressBookAPI);

module.exports = routerAddressBook;