const connection = required('../config/database');
const Employee = require('../models/Employee.js');

const { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } = require('../service/EmployeeCRUD_Services');

// Lấy danh sách tất cả nhân viên
const getAllEmployeesAPI = async (req, res) => {
    try {
        const employees = await getAllEmployees();
        res.status(200).json({
            success: true,
            data: employees,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve employees.', error });
    }
};

// Lấy thông tin chi tiết của một nhân viên
const getEmployeeAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await getEmployeeById(id);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found.' });
        }
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve employee.', error });
    }
};

// Thêm mới một nhân viên
const postCreateEmployeeAPI = async (req, res) => {
    try {
        const { id, surname, lastname, identityNumber, email, birthdate, image, phone, gender, status } = req.body;
        const insertId = await createEmployee(id, surname, lastname, identityNumber, email, birthdate, image, phone, gender, status);
        if (insertId) {
            res.status(201).json({ success: true, message: 'Employee created successfully.', data: { id: insertId } });
        } else {
            res.status(500).json({ success: false, message: 'Failed to create employee.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create employee.', error });
    }
};

// Cập nhật thông tin nhân viên
const putUpdateEmployeeAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const { surname, lastname, identityNumber, email, birthdate, image, phone, gender, status } = req.body;
        const affectedRows = await updateEmployee(id, surname, lastname, identityNumber, email, birthdate, image, phone, gender, status);
        if (affectedRows) {
            res.status(200).json({ success: true, message: 'Employee updated successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'Employee not found or no changes applied.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update employee.', error });
    }
};

// Xóa một nhân viên
const deleteEmployeeAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await deleteEmployee(id);
        if (affectedRows) {
            res.status(200).json({ success: true, message: 'Employee deleted successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'Employee not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete employee.', error });
    }
};

module.exports = {
    getAllEmployeesAPI,
    getEmployeeAPI,
    postCreateEmployeeAPI,
    putUpdateEmployeeAPI,
    deleteEmployeeAPI,
};
