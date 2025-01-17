const express = require('express');
const {
    getAllAttributeAPI, getAttributeByIdAPI, getAttributeByCategoryAPI,
    postCreateAttributeAPI, putUpdateAttributeAPI, updateStatusAttributeAPI,
    //Attr Group
    getAllAttributeGroupAPI, getAttributeGroupByIdAPI, 
    postCreateAttributeGroupAPI, putUpdateAttributeGroupAPI,
    updateStatusAttributeGroupAPI
} = require('../controllers/api/AttributeController');
const routerAttribute = express.Router();

routerAttribute.get('/', getAllAttributeAPI);
routerAttribute.get('/groupAttr', getAllAttributeGroupAPI);
routerAttribute.get('/:id', getAttributeByIdAPI);
routerAttribute.get('/category/:id', getAttributeByCategoryAPI);
routerAttribute.post('/', postCreateAttributeAPI);
routerAttribute.put('/:id', putUpdateAttributeAPI);
routerAttribute.put('/updateStatus/:id', updateStatusAttributeAPI);

module.exports = routerAttribute;