const Employee = require('../models/Employee');
const Account = require('../models/Account');
const { generateEmployeeId } = require('../helpers/validate');
const { report } = require('../routes/employeeApi');
// Lấy danh sách tất cả nhân viên
const getAllEmployees = async () => {
    return await Employee.findAll();
};
// Lấy thông tin nhân viên theo ID
const getEmployeeById = async (id) => {
    try {
        const employee = await Employee.findByPk(id);
        return employee;
    } catch (error) {
        throw error;
    }
};
// Tạo nhân viên mới
const createEmployee = async (data) => {
    const newId = await generateEmployeeId();
    return await Employee.create({
        id: newId,
        ...data,
        status: 1
    });
};
const createAccountEmployee = async (employees) => {
    const accountEmploye = await Account.create({
        idPerson: employees.id,
        username: employees.email,
        password: 123456,
        idRole: 'EMP',
        isNew: 1,
        status: 1
    });
    return await accountEmploye;
}
const existingEmail = async (email) => {
    return await Employee.findOne({
        where: {
            email: email,
        }
    });
}
const existingIdentityNumber = async (IdentityNumber) => {
    return await Employee.findOne({
        where: {
            email: IdentityNumber,
        }
    });
}
const existingPhone = async (Phone) => {
    return await Employee.findOne({
        where: {
            Phone: Phone,
        }
    });
}
// Cập nhật thông tin nhân viên
const updateEmployee = async (id, data) => {
    const employee = await Employee.findByPk(id);
    if (employee) {
        return await employee.update(data);
    }
    return null;
};
// Xóa nhân viên theo ID
const EmployeeStatus = async (id) => {
    const employee = await Employee.findByPk(id);
    if (employee) {
        return await employee.update({ delete_at: 0 });
    }
    return null;
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    createAccountEmployee,
    existingEmail,
    existingIdentityNumber,
    existingPhone,
    updateEmployee,
    EmployeeStatus,
    
};
