const { 
    getAllAccounts, 
    getAccountById, 
    createAccount, 
    updateAccount, 
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
    }
  };
  // Get account by id
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
    getAllAccountsAPI,
    getAccountByIdAPI,
    createAccountAPI,
    updateAccountAPI,
    softDeleteAccountAPI
  };
  