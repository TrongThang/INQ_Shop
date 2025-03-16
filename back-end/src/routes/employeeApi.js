const express = require('express');
const {
    getAllEmployeesAPI,
    getEmployeeByIdAPI,
    postCreateEmployeeAPI,
    putUpdateEmployeeAPI,
    statusEmployeeAPI,
} = require('../controllers/api/EmployeeController');
const routerEmployee = express.Router();


routerEmployee.get('/', getAllEmployeesAPI);   //
routerEmployee.get('/:id', getEmployeeByIdAPI);   //
routerEmployee.post('/', postCreateEmployeeAPI);  ///
routerEmployee.put('/:id', putUpdateEmployeeAPI);   //
routerEmployee.put('/status/:id', statusEmployeeAPI);  //


module.exports = routerEmployee;