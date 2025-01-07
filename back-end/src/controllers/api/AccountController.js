const {
  getLogin,
  getAccountById,
  getAllAccounts,
  createAccount,
  updateAccount,
  updateStatusAccount,
  changePassword,
} = require('../../services/AccountServices');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const getLoginAPI = async (req, res) => {
  try {
    const { username, password, type } = req.body;
    console.log(username, password, type);

    const account = await getLogin(username, password, type);
    let token;
    if (account) {
      // Tạo token JWT khi đăng nhập thành công
      if (account) {
        // Create a JWT token when login is successful
        token = jwt.sign(
          {
            idPerson: account.idPerson,
            username: account.username,
            idRole: account.idRole
          },
          process.env.SECRET_KEY, // Use secret key from environment variable
          { expiresIn: '1h' } // Token expires after 1 hour
        );
      }

      // Lưu thông tin vào session nếu cần thiết
      req.session.isLogged = true;
      req.session.idPerson = account.idPerson;

      return res.status(200).json({
        success: true,
        data: { token }, // Trả về token thay vì thông tin người dùng
        message: 'Đăng nhập thành công',
      });
    }

    return res.status(404).json({ success: false, message: 'Tài khoản hoặc mật khẩu không tồn tại' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi trong quá trình đăng nhập',
      details: error.message
    });
  }
};
// const getAccountByIdAPI = async (req, res) => {
//   try {
//     const { idPerson } = req.params;
//     const account = await getAccountById(idPerson);
//     if (account) {
//       res.status(200).json({ success: true, data: account });
//     } else {
//       res.status(404).json({ success: false, message: 'Account not found.' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

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
  // getAccountByIdAPI,
  createAccountAPI,
  updateAccountAPI,
  softDeleteAccountAPI
};
