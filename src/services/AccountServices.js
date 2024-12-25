
const Account = require('../models/Account');
const Role = require('../models/Role');
const Employee = require('../models/Employee');
const CustomerService = require('../services/CustomerServices');
const EmployeeService = require('../services/EmployeeServices');

const getAllAccounts = async () => {
    return await Account.findAll({
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['nameRole']
        },
        {
          model: Employee,
          as: 'employee',
          attributes: ['surname', 'lastname']
        }
      ]
    });
};
  
// Get account by idPerson
const getAccountByCondition = async (idPerson = {}, username = {}) => {
  return await Account.findOne({
    where: {
      idPerson: idPerson,
      username: username
    },
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['nameRole']
      },
      {
        model: Employee,
        as: 'employee',
        attributes: ['surname', 'lastname']
      }
    ]
  });
};

// Create a new account
const createAccount = async (accountData, personData) => {
  const resultAccount = await Account.create(accountData);
  const resultPersonData = null;

  if (accountData.idRole === 'E') {
    resultPersonData = await EmployeeService.createEmployee(personData)
  }
  else if (accountData.idRole === 'C') {
    resultPersonData = await CustomerService.createCustomer(personData);
  }
  return [resultAccount, resultPersonData]; 
};

// Update an account
const updateAccount = async (idPerson, accountData) => {
  return await Account.update(accountData, {
    where: { idPerson }
  });
};

// set Status account:
// 0: BAN account
// 1: Account is Active

const updateStatusAccount = async (idPerson, status) => {
  return await Account.update({ status: 0 }, {
    where: {
      idPerson: idPerson,
      status: status
    }
  });
};

const checkPassword = async (username, password) => {
  const account = getAccountByCondition(username = username)
  return password === account.password;
}
// change Password
const changePassword = async(username, password) => {
  if (checkPassword(username, password)) {
    return await Account.update(password, {
      where: {username}
    });
  }

  return false;
}

module.exports = {
  getAllAccounts,
  getAccountByCondition,
  createAccount,
  updateAccount,
  updateStatusAccount
};