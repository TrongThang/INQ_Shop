const express = require('express');
const {
    getAllAddressBookAPI,
    getAddressBookAPI,
    postCreateAddressBookAPI,
    putUpdateAddressBookAPI
} = require('../controllers/api/AddressBookController');
const routerAddressBook = express.Router();


routerAddressBook.get('/', getAllAddressBookAPI);
routerAddressBook.post('/', postCreateAddressBookAPI);
routerAddressBook.put('/', putUpdateAddressBookAPI);

module.exports = routerAddressBook;