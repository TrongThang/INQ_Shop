
const Account = require('../models/Account');
const Role = require('../models/Role');
const Employee = require('../models/Employee');
<<<<<<< HEAD

const getAllAccounts = async () => {
    return await Account.findAll({
      include: [
        { model: Role, as: 'role', attributes: ['nameRole'] },
        { model: Employee, as: 'employee', attributes: ['surname', 'lastname'] }
      ]
    });
  };
=======
const CustomerService = require('../services/CustomerServices');
const EmployeeService = require('../services/EmployeeServices');
const { Op } = require('sequelize');

//0: Dừng hoạt động - Bị khoá
const getLogin = async (username, password, type) => {

  const user = await Account.findOne({
    where: {
      username: username,
      password: password,
      idRole: type,
      status: {
        [Op.gt]: 0 
      }
    }
  })
  return user;
}

>>>>>>> 5325c7d5e06d8506399c463e3eb00a53859f2c24
// Get account by idPerson
const getAccountById = async (idPerson) => {
  return await Account.findOne({
    where: { idPerson },
    include: [
      { model: Role, as: 'role', attributes: ['nameRole'] },
      { model: Employee, as: 'employee', attributes: ['surname', 'lastname'] }
    ]
  });
};

// Create a new account
const createAccount = async (accountData) => {
  return await Account.create(accountData);
};

// Update an account
const updateAccount = async (idPerson, accountData) => {
  return await Account.update(accountData, {
    where: { idPerson }
  });
};

// Soft delete an account (set status to 0)
const softDeleteAccount = async (idPerson) => {
  return await Account.update({ status: 0 }, {
    where: { idPerson }
  });
};

module.exports = {
<<<<<<< HEAD
  getAllAccounts,
  getAccountById,
=======
  getLogin,
  getAccountByCondition,
>>>>>>> 5325c7d5e06d8506399c463e3eb00a53859f2c24
  createAccount,
  updateAccount,
  softDeleteAccount
};