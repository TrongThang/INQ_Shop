const express = require('express');
const router = express.Router();
const { 
    getAllContactAPI, 
    getContactAPI, 
    postCreateContactAPI, 
    putUpdateContactAPI, 
    deleteContactAPI 
} = require('../../src/controllers/api/ContactController')  

router.get('/contacts', getAllContactAPI); 
router.get('/contacts/:id', getContactAPI); 
router.post('/contacts-add', postCreateContactAPI); 
router.put('/contacts/:id', putUpdateContactAPI); 

module.exports = router;