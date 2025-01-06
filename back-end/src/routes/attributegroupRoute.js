const express = require('express');
const {
    getAllAttributeAPI, getAttributeByIdAPI, getAttributeByCategoryAPI,
    postCreateAttributeAPI, putUpdateAttributeAPI, updateStatusAttributeAPI,
    //Attr Group
    getAllAttributeGroupAPI, getAttributeGroupByIdAPI, 
    postCreateAttributeGroupAPI, putUpdateAttributeGroupAPI,
    updateStatusAttributeGroupAPI
} = require('../controllers/api/AttributeController');
const routerAttributeGroup = express.Router();
routerAttributeGroup.get('/', getAllAttributeGroupAPI);

routerAttributeGroup.get('/:id', getAttributeGroupByIdAPI);
routerAttributeGroup.post('/', postCreateAttributeGroupAPI);
routerAttributeGroup.put('/:id', putUpdateAttributeGroupAPI);
routerAttributeGroup.put('/status/:id',updateStatusAttributeGroupAPI);
module.exports = routerAttributeGroup;