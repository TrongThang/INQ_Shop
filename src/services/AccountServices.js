
const Account = require('../models/Account');
const Role = require('../models/Role');
const Employee = require('../models/Employee');

const getAllAccounts = async () => {
    return await Account.findAll({
      include: [
        { model: Role, as: 'role', attributes: ['nameRole'] },
        { model: Employee, as: 'employee', attributes: ['surname', 'lastname'] }
      ]
    });
  };
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
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  softDeleteAccount
};