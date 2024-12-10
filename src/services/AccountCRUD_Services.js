const Account = require('../models/Account');
const Employee = require('../models/Employee');
const Role = require('../models/Role'); // Nếu cần dùng đến bảng Role

// Lấy danh sách tất cả các tài khoản
const getAllAccounts = async () => {
    return await Account.findAll({
        include: [
            { model: Employee, as: 'employee' },
            { model: Role, as: 'role' }, // Nếu muốn lấy thông tin role
        ],
    });
};

// Lấy thông tin tài khoản theo ID
const getAccountById = async (idPerson) => {
    return await Account.findByPk(idPerson, {
        include: [
            { model: Employee, as: 'employee' },
            { model: Role, as: 'role' }, // Nếu cần
        ],
    });
};

// Tạo tài khoản mới
const createAccount = async (data) => {
    return await Account.create(data);
};

// Cập nhật thông tin tài khoản
const updateAccount = async (idPerson, data) => {
    const account = await Account.findByPk(idPerson);
    if (account) {
        return await account.update(data);
    }
    return null;
};

// Xóa tài khoản theo ID
const deleteAccount = async (idPerson) => {
    const account = await Account.findByPk(idPerson);
    if (account) {
        return await account.destroy();
    }
    return null;
};

module.exports = {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,
};
