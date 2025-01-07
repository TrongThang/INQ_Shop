const express = require('express');
const {
    getAllOrSingleAddressBookAPI,
    getAddressBookAPI,
    removeAddressBookByIdAPI,
    getAddressBooksByIdCustomerAPI,
    postCreateAddressBookAPI,
    putUpdateAddressBookAPI
} = require('../controllers/api/AddressBookController');
const routerAddressBook = express.Router();


routerAddressBook.get('/:idCustomer', getAddressBooksByIdCustomerAPI);
routerAddressBook.get('/Customer', getAddressBooksByIdCustomerAPI );
routerAddressBook.post('/', postCreateAddressBookAPI);
routerAddressBook.put('/:id/:idCustomer', putUpdateAddressBookAPI);
routerAddressBook.delete('/:id/:idCustomer', removeAddressBookByIdAPI);

module.exports = routerAddressBook;