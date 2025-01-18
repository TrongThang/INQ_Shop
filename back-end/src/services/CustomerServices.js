const Customer = require('../models/Customer');
const Address_book = require('../models/Address_book');
const Account = require('../models/Account');
// Lấy danh sách tất cả khách hàng
const getAllCustomers = async () => {
    return await Customer.findAll();
};

// Lấy thông tin khách hàng theo ID
const getCustomerById = async (id) => {
    console.log("ID: ", id);

    const customer = await Customer.findByPk(id, {
        include: [
            {
                model: Account,
                as: 'account',
                attributes: ['username']
            }
        ],
    });

    return customer;
};


// Tạo khách hàng mới
const createCustomer = async (data) => {
    return await Customer.create(data);
};

// Cập nhật thông tin khách hàng
const updateCustomer = async (id, data) => {
    const customer = await Customer.findByPk(id);
    if (customer) {
        return await customer.update(data);
    }
    return null;
};

// Xóa khách hàng theo ID
const deleteCustomer = async (id) => {
    const customer = await Customer.findByPk(id);
    if (customer) {
        return await customer.update({ status: 0 });
    }
    return null;
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
