const { 
    getLogin,
    getAllAccounts, 
    createAccount, 
    updateAccount, 
<<<<<<< HEAD
    softDeleteAccount 
  } = require('../../services/AccountServices');
  
// Get all accounts
const getAllAccountsAPI = async (req, res) => {
    try {
      const accounts = await getAllAccounts();
      res.status(200).json({ success: true, data: accounts });
    } catch (error) {
      console.error('Error fetching accounts:', error); // Log the error details
      res.status(500).json({ success: false, message: 'An error occurred while fetching accounts.' });
=======
    updateStatusAccount 
} = require('../../services/AccountServices');

const getLoginAPI = async (req, res) => {
  try {
    const { username, password, type } = req.body;
    console.log(username, password, type)

    const account = await getLogin(username, password, type);

    if (account)
    {
      return res.status(200).json({
        success: true,
        data: account
      });
>>>>>>> 5325c7d5e06d8506399c463e3eb00a53859f2c24
    }

    return res.status(404).json({ success: false, message: 'Account not found' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      details: error.message
    });
  }
}

const getAccountByIdAPI = async (req, res) => {
  try {
    const { idPerson } = req.params;
    const account = await getAccountById(idPerson);
    if (account) {
      res.status(200).json({ success: true, data: account });
    } else {
      res.status(404).json({ success: false, message: 'Account not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new account
const createAccountAPI = async (req, res) => {
  try {
    const accountData = req.body;
    const newAccount = await createAccount(accountData);
    res.status(201).json({ success: true, data: newAccount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an account
const updateAccountAPI = async (req, res) => {
  try {
    const { idPerson } = req.params;
    const accountData = req.body;
    const result = await updateAccount(idPerson, accountData);
    if (result[0]) {
      res.status(200).json({ success: true, message: 'Account updated successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Account not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Soft delete an account
const softDeleteAccountAPI = async (req, res) => {
  try {
    const { idPerson } = req.params;
    const result = await softDeleteAccount(idPerson);
    if (result[0]) {
      res.status(200).json({ success: true, message: 'Account deleted successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Account not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getLoginAPI,
  getAccountByIdAPI,
  createAccountAPI,
  updateAccountAPI,
  softDeleteAccountAPI
};
