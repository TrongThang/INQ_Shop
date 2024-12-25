const express = require('express');
const { 
    getAllContactOrgetOneContact,
    postCreateContactAPI, 
    putUpdateContactAPI, 
} = require('../controllers/api/ContactController')  

const routerContact = express.Router();

routerContact.get('/', getAllContactOrgetOneContact); 
routerContact.post('/', postCreateContactAPI); 
routerContact.put('/', putUpdateContactAPI); 

module.exports = routerContact;