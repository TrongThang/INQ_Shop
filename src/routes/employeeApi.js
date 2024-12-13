const express = require('express');
const {
    getAllEmployeesAPI,
    getEmployeeByIdAPI,
    postCreateEmployeeAPI,
    putUpdateEmployeeAPI,
    deleteEmployeeAPI,
} = require('../controllers/api/EmployeeController');
const routerEmployee = express.Router();


routerEmployee.get('/', getAllEmployeesAPI);   //
routerEmployee.get('/:id', getEmployeeByIdAPI);   //
routerEmployee.post('/', postCreateEmployeeAPI);  ///
routerEmployee.put('/:id', putUpdateEmployeeAPI);   //
routerEmployee.delete('/', deleteEmployeeAPI);  //


module.exports = routerEmployee;