const {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,
} = require('../services/AccountCRUD_Services');

const getAllAccountsAPI = async (req, res) => {
    try {
        const accounts = await getAllAccounts();
        res.status(200).json({ success: true, data: accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAccountAPI = async (req, res) => {
    try {
        const { idPerson } = req.params;
        const account = await getAccountById(idPerson);
        if (!account) {
            return res.status(404).json({ success: false, message: 'Account not found.' });
        }
        res.status(200).json({ success: true, data: account });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const postCreateAccountAPI = async (req, res) => {
    try {
        const data = req.body;
        const account = await createAccount(data);
        res.status(201).json({ success: true, data: account });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const putUpdateAccountAPI = async (req, res) => {
    try {
        const { idPerson } = req.params;
        const data = req.body;
        const account = await updateAccount(idPerson, data);
        if (!account) {
            return res.status(404).json({ success: false, message: 'Account not found.' });
        }
        res.status(200).json({ success: true, data: account });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteAccountAPI = async (req, res) => {
    try {
        const { idPerson } = req.params;
        const account = await deleteAccount(idPerson);
        if (!account) {
            return res.status(404).json({ success: false, message: 'Account not found.' });
        }
        res.status(200).json({ success: true, message: 'Account deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllAccountsAPI,
    getAccountAPI,
    postCreateAccountAPI,
    putUpdateAccountAPI,
    deleteAccountAPI,
};
