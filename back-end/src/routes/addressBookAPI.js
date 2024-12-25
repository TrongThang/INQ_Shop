const express = require('express');
const {
    getAllOrSingleAddressBookAPI,
    postCreateAddressBookAPI,
    putUpdateAddressBookAPI
} = require('../controllers/api/AddressBookController');
const routerAddressBook = express.Router();


routerAddressBook.get('/', getAllOrSingleAddressBookAPI );
routerAddressBook.post('/', postCreateAddressBookAPI);
routerAddressBook.put('/', putUpdateAddressBookAPI);

module.exports = routerAddressBook;