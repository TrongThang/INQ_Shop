const connection = require('../../config/database');
const Customer = require('../../models/Customer');
const {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} = require('../../services/CustomerServices');

const getAllCustomersAPI = async (req, res) => {
    try {
        const customers = await getAllCustomers();

        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCustomerByIdAPI = async (req, res) => {
    const id = req.params.id;

    try {
        console.log('ID: ', id)
        const customer = await getCustomerById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: customer
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const postCreateCustomerAPI = async (req, res) => {
    try {
        const data = req.body;
        const customer = await createCustomer(data);
        res.status(201).json({ success: true, data: customer });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Lấy chi tiết lỗi validation từ Sequelize
            const errors = error.errors.map(err => ({
                field: err.path,
                message: err.message
            }));
            res.status(400).json({ success: false, message: "Validation error", errors });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            // Lỗi unique constraint
            const errors = error.errors.map(err => ({
                field: err.path,
                message: err.message
            }));
            res.status(400).json({ success: false, message: "Unique constraint error", errors });
        } else {
            // Các lỗi khác
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

const putUpdateCustomerAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const customer = await updateCustomer(id, data);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found.' });
        }
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteCustomerAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await deleteCustomer(id);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found.' });
        }
        res.status(200).json({ success: true, message: 'Customer status updated to 0 (soft deleted).' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = {
    getAllCustomersAPI,
    getCustomerByIdAPI,
    postCreateCustomerAPI,
    putUpdateCustomerAPI,
    deleteCustomerAPI,
};
