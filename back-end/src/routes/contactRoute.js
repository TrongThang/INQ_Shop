const express = require('express');
const router = express.Router();
const { 
    getAllContactOrgetOneContact,
    postCreateContactAPI, 
    putUpdateContactAPI, 
} = require('../controllers/api/ContactController')  
router.get('/', getAllContactOrgetOneContact); 
router.post('/', postCreateContactAPI); 
router.put('/', putUpdateContactAPI); 
module.exports = router;