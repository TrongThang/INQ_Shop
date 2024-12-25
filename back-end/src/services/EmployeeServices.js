const Employee = require('../models/Employee');

// Lấy danh sách tất cả nhân viên
const getAllEmployees = async () => {
    return await Employee.findAll();
};

// Lấy thông tin nhân viên theo ID
const getEmployeeById = async (id) => {
    return await Employee.findByPk(id);
};

// Tạo nhân viên mới
const createEmployee = async (data) => {
    return await Employee.create(data);
};

// Cập nhật thông tin nhân viên
const updateEmployee = async (id, data) => {
    const employee = await Employee.findByPk(id);
    if (employee) {
        return await employee.update(data);
    }
    return null;
};

// Xóa nhân viên theo ID
const deleteEmployee = async (id) => {
   
        const employee = await Employee.findByPk(id);
        if (employee) {
            return await employee.update({ status: 0 });
        }
        return null;
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
