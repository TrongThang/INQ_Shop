const connection = required('../config/database');
const Customer = require('../models/Customer.js');
const {Op} =require ('sequelize');


const { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = require('../service/CustomerCRUD_Services');

// Lấy danh sách tất cả khách hàng  --Admin
const getAllCustomerAPI = async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.status(200).json({
            success: true,
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Không thể truy xuất khách hàng.',
            error: error.message,
        });
    }
};

// Lấy thông tin chi tiết của một khách hàng theo ID  --Admin
const getCustomerAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await getCustomerById(id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy khách hàng có ${id}.`,
            });
        }
        res.status(200).json({
            success: true,
            data: customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Không thể truy xuất khách hàng',
            error: error.message,
        });
    }
};

// Thêm mới một khách hàng -- User
const postCreateCustomerAPI = async (req, res) => {
    try {
        const { surname, lastName, phone, identityNumber, birthdate, gender, email, status } = req.body;
        const insertId = await createCustomer(surname, lastName, phone, identityNumber, birthdate, gender, email, status);
        if (insertId) {
            res.status(201).json({
                success: true,
                message: 'Khách hàng đã tạo thành công.',
                data: { id: insertId },
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Không tạo được khách hàng.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Không tạo được khách hàng.',
            error: error.message,
        });
    }
};

// Cập nhật thông tin khách hàng  --User
const putUpdateCustomerAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const { surname, lastName, phone, identityNumber, birthdate, gender, email, status } = req.body;
        const affectedRows = await updateCustomer(id, surname, lastName, phone, identityNumber, birthdate, gender, email, status);
        if (affectedRows) {
            res.status(200).json({
                success: true,
                message: 'Khách hàng cập nhật thành công.',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Không tìm thấy khách hàng hoặc không có thay đổi nào được áp dụng.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Không cập nhật được khách hàng.',
            error: error.message,
        });
    }
};

// Xóa một khách hàng  --Admin
const deleteCustomerAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await deleteCustomer(id);
        if (affectedRows) {
            res.status(200).json({
                success: true,
                message: 'Khách hàng đã xóa thành công.',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Không tìm thấy khách hàng.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Không xóa được khách hàng.',
            error:error.message, 
        });
    }
};

module.exports = {
    getAllCustomerAPI,
    getCustomerAPI,
    postCreateCustomerAPI,
    putUpdateCustomerAPI,
    deleteCustomerAPI,
};
