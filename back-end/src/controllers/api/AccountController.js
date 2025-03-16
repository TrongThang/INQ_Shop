const {
  getLogin,
  getAccountById,
  getAllAccounts,
  createAccount,
  updateAccount,
  updateStatusAccount,
  changePassword,
} = require('../../services/AccountServices');
require('dotenv').config();

const axios = require("axios");
// Lưu số lần đăng nhập sai theo từng username
const failedLoginAttempts = {};

const getLoginAPI = async (req, res) => {
  try {
    const { username, password, type, captchaResponse } = req.body;

    // Kiểm tra nếu nhập sai >= 3 lần, yêu cầu CAPTCHA
    if (failedLoginAttempts[username] >= 3) {
      if (!captchaResponse) {
        return res.status(403).json({
          success: false,
          message: "Vui lòng xác nhận CAPTCHA trước khi đăng nhập.",
        });
      }

      // Xác thực CAPTCHA với Google
      const secretKey = "6LcAGtkqAAAAAEKMuh7jeoYkKAfhpqj2gYHsxnR9"; // Lấy secret key từ .env
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;

      const captchaVerify = await axios.post(verifyUrl, null, {
        params: {
          secret: secretKey,
          response: captchaResponse,
        },
      });

      if (captchaVerify.data.success) {
        return res.status(403).json({
          success: false,
          message: "Xác thực CAPTCHA không thành công.",
        });
      }
    }

    // Xác thực thông tin đăng nhập
    const account = await getLogin(username, password, type);

    if (account) {
      // Reset số lần nhập sai nếu đăng nhập thành công
      failedLoginAttempts[username] = 0;

      // Lưu session
      req.session.isLogged = true;
      req.session.user = {
        idPerson: account.idPerson,
        username: account.username,
        idRole: account.idRole,
      };
      console.log("Session sau lưu:", req.session);

      return res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        user: req.session.user,
        isLogged: req.session.isLogged,
      });
    }

    // Tăng số lần nhập sai
    failedLoginAttempts[username] = (failedLoginAttempts[username] || 0) + 1;

    return res.status(404).json({
      success: false,
      message: "Tài khoản hoặc mật khẩu không chính xác",
      failedAttempts: failedLoginAttempts[username],
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi trong quá trình đăng nhập",
      details: error.message,
    });
  }
};
const logoutAPI = (req, res) => {
  const { username } = req.session.user;

  // Clear failed login attempts for the user
  delete failedLoginAttempts[username];

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Lỗi đăng xuất" });
    }
    res.clearCookie('connect.sid'); // Xóa cookie session
    return res.status(200).json({ success: true, message: "Đăng xuất thành công" });
  });
};
const checkLoginAPI = (req, res) => {
  if (req.session.isLogged) {
    return res.status(200).json({
      success: true,
      user: req.session.user,
    });
  } else {
    return res.status(401).json({
      success: false,
      isLogged: req.session.isLogged == false,
      message: "Chưa đăng nhập"
    });
  }
};


// Create a new account
const createAccountAPI = async (req, res) => {
  try {
    const accountData = req.body;
    console.log("AaccountData", accountData)
    console.log("newAccount", newAccount)

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
  checkLoginAPI,
  logoutAPI,
  updateAccountAPI,
  softDeleteAccountAPI
};
