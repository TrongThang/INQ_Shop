const connection = require('../../config/database');
const { ERROR_CODES, ERROR_MESSAGES } = require('../../../../contants');
const { isValidEmail, compareData, isValidPhone,
    isValidSurname, isValidLastname,
    isValidBirthDate } = require('../../helpers/validate');
const Customer = require('../../models/Customer');
const {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    createAccountCustomer,
    existingEmail,
    existingPhone,
    updateCustomer,
    statusCustomer,
} = require('../../services/CustomerServices');

const getAllCustomersAPI = async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        res.status(ERROR_CODES.COMMON.INTERNAL_ERROR).json({ success: false, message: error.message });
    }
};

const getCustomerByIdAPI = async (req, res) => {
    const { id } = req.params;
    try {
        console.log('ID: ', id)
        const customer = await getCustomerById(id);

        if (!customer) {
            return res.status(ERROR_CODES.COMMON.NOT_FOUND).json({
                success: false,
                message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.COMMON.NOT_FOUND]
            });
        }

        return res.status(200).json({
            success: true,
            data: customer
        });
    } catch (error) {
        console.error(error);
        return res.status(ERROR_CODES.COMMON.INTERNAL_ERROR).json({
            success: false,
            message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.COMMON.INTERNAL_ERROR]
        });
    }
};

const postCreateCustomerAPI = async (req, res) => {
    try {
        const { surname, lastName, phone, identityNumber, image = "", email, birthdate } = req.body;
        // Kiểm tra các điều kiện đầu vào
        if (!surname || !isValidSurname(surname) || surname.trim() === "") {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.SUR_NAME] }
            );
        }
        if (!lastName || !isValidLastname(lastName) || lastName.trim() === "") {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_CODES.CUSTOMER[ERROR_CODES.CUSTOMER.LAST_NAME] }
            );
        }
        if (!identityNumber || isNaN(identityNumber)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.IDENTITY_NUMBER] }
            );
        }
        if (email && !isValidEmail(email)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.EMAIL] }
            );
        }
        if (phone && !isValidPhone(phone)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.PHONE] }
            );
        }
        if (birthdate && !isValidBirthDate(birthdate)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.BIRTH_DATE] }
            );
        }
        const existingEmails = await existingEmail(email);
        const existingPhones = await existingPhone(phone);
        //Kiểm tra trùng Email
        if (existingEmails) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.EXISTING_EMAIL] }
            );
        }
        //Kiểm tra trùng số điện thoại
        if (existingPhones) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.EXISTING_PHONE] }
            );
        }
        // Tạo khách hàng nếu dữ liệu hợp lệ
        const customer = await createCustomer(req.body);
        const accountCustomer = await createAccountCustomer(customer);
        res.status(201).json(
            {
                success: true,
                data: customer,
                account: accountCustomer
            });
    } catch (error) {
        res.status(ERROR_CODES.COMMON.INTERNAL_ERROR).json(
            { success: false, message: error.message }
        );
    }
};

const putUpdateCustomerAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const { surname, lastName, phone, email, image = "", gender, birthdate } = req.body;
        // Kiểm tra các điều kiện đầu vào
        if (!surname || !isValidSurname(surname) || surname.trim() === "") {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.SUR_NAME] }
            );
        }
        if (!lastName || !isValidLastname(lastName) || lastName.trim() === "") {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_CODES.CUSTOMER[ERROR_CODES.CUSTOMER.LAST_NAME] }
            );
        }
        if (email && !isValidEmail(email)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.EMAIL] }
            );
        }
        if (phone && !isValidPhone(phone)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.PHONE] }
            );
        }
        if (birthdate && !isValidBirthDate(birthdate)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.BIRTH_DATE] }
            );
        }
        // Cập nhật khách hàng nếu dữ liệu hợp lệ
        const currentCustomer = await getCustomerById(id);
        if (!currentCustomer) {
            return res.status(ERROR_CODES.COMMON.NOT_FOUND).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.COMMON.NOT_FOUND] }
            );
        }
        // So sánh dữ liệu mới và dữ liệu cũ
        const newData = { surname, lastName, email, phone, gender, birthdate };
        const isDataChanged = compareData(newData, currentCustomer);
        console.log("currentEmployee", currentCustomer);
        console.log("isDataChanged", isDataChanged);
        console.log("newData", newData);

        //kiểm tra dữ liệu có thay đổi không
        if (!isDataChanged) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json({
                success: false,
                message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.CUSTOMER.COMPARE_DATA]
            });
        }
        // Cập nhật thông tin nhân viên nếu dữ liệu hợp lệ
        const updatedCustomer = await updateCustomer(id, newData);
        if (!updatedCustomer) {
            return res.status(ERROR_CODES.COMMON.NOT_FOUND).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.COMMON.NOT_FOUND] }
            );
        }
        res.status(200).json({ success: true, data: updatedCustomer });
    } catch (error) {

        res.status(500).json(
            {
                success: false, message: error.message
                    || ERROR_MESSAGES.CUSTOMER[ERROR_CODES.COMMON.INTERNAL_ERROR]
            }
        );
    }
};

const statusCustomerAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const customer = await statusCustomer(id, data);
        if (!customer) {
            return res.status(ERROR_CODES.COMMON.NOT_FOUND).json(
                { success: false, message: ERROR_MESSAGES.CUSTOMER[ERROR_CODES.COMMON.NOT_FOUND] }
            );
        }
        res.status(200).json(
            { success: true, message: 'Cập nhật trạng thái thành công.' }
        );
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = {
    getAllCustomersAPI,
    getCustomerByIdAPI,
    postCreateCustomerAPI,
    putUpdateCustomerAPI,
    statusCustomerAPI,
};
