const Customer = require('../models/Customer');
const Address_book = require('../models/Address_book');
const { generateCustomerId } = require('../helpers/validate');
const Account = require('../models/Account');
const { ERROR_CODES, ERROR_MESSAGES } = require('../../../contants');
// Lấy danh sách tất cả khách hàng
const getAllCustomers = async () => {
    return await Customer.findAll();
};

// Lấy thông tin khách hàng theo ID
const getCustomerById = async (id) => {
    console.log("ID: ", id);
    // Fetch the customer by primary key and include associated Account model
    const customer = await Customer.findByPk(id, {
        include: [
            {
                model: Account,       // Include the Account model
                as: 'account',        // Alias for the Account relationship (adjust if needed)
                attributes: ['username']  // Specify only the 'username' attribute
            }
        ],
    });
    return customer;
};


// Tạo khách hàng mới
const createCustomer = async (data) => {
    const newId = await generateCustomerId();
    return await Customer.create({
        id: newId,
        ...data,
        status: 1
    });
};
const createAccountCustomer = async (customer) => {
    const accountCustomer = await Account.create({
        idPerson: customer.id,
        username: customer.email,
        password: 123456,
        idRole: 'CUS',
        report: 0,
        isNew: 1,
        status: 1
    });
    return await accountCustomer;
}
const existingEmail = async (email) => {
    return await Customer.findOne({
        where: {
            email: email,
        }
    });
}
const existingIdentityNumber = async (IdentityNumber) => {
    return await Customer.findOne({
        where: {
            identityNumber: IdentityNumber,
        }
    });
}
const existingPhone = async (Phone) => {
    return await Customer.findOne({
        where: {
            phone: Phone,
        }
    });
}
// Cập nhật thông tin khách hàng
const updateCustomer = async (id, data) => {
    const customer = await Customer.findByPk(id);
    if (!customer) {
        throw new Error(ERROR_MESSAGES.CUSTOMER[ERROR_CODES.COMMON.NOT_FOUND]);
    }
    return await customer.update(data);
};

// Xóa khách hàng theo ID
const statusCustomer = async (id, data) => {
    try {
        // Tìm customer theo ID
        const customer = await Customer.findByPk(id);
        if (!customer) {
            throw new Error(ERROR_MESSAGES.CUSTOMER[ERROR_CODES.COMMON.NOT_FOUND]);
        }
        const account = await Account.findOne({ where: { idPerson: id } });
        // Cập nhật trạng thái của Account nếu tồn tại
        if (account) {
            await account.update({ status: data.status });
        }

        // Cập nhật trạng thái của Customer
        await customer.update({ status: data.status });

        return { message: "Cập nhật trạng thái thành công", status: data.status };
    } catch (error) {
        throw new Error(error.message || "Lỗi khi cập nhật trạng thái khách hàng");
    }
};


module.exports = {
    getAllCustomers,
    createAccountCustomer,
    getCustomerById,
    existingEmail,
    existingPhone,
    createCustomer,
    updateCustomer,
    statusCustomer,
};
