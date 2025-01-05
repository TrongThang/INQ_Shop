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
routerAttribute.post('/', postCreateAttributeAPI);
routerAttribute.put('/:id', putUpdateAttributeAPI);

module.exports = routerAttribute;