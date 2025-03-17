const express = require('express');
const { getUnitAPI, postUnitAPI, putUnitAPI, deleteUnitAPI,getUnitByIdAPI } = require('../controllers/api/UnitController');

const routerUnit = express.Router();

routerUnit.get('/', getUnitAPI);
routerUnit.get('/:id', getUnitByIdAPI);

routerUnit.post('/add', postUnitAPI);
routerUnit.put('/:id', putUnitAPI);
routerUnit.delete('/:id', deleteUnitAPI);

module.exports = routerUnit;