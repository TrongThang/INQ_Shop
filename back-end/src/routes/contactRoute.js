const express = require('express');
const {
    getAllContactOrgetOneContact,
    postCreateContactAPI,
    putUpdateContactAPI,
    getContactAPI
} = require('../controllers/api/ContactController.js');
const routerContact = express.Router();


routerContact.get('/', getAllContactOrgetOneContact);

routerContact.get('/:id', getContactAPI);

routerContact.post('/', postCreateContactAPI);

routerContact.put('/:id', putUpdateContactAPI);


module.exports = routerContact;
