const { ERROR_CODES, ERROR_MESSAGES } = require('../../../../contants');
const fs = require('fs');
const { isValidEmail, compareData, isValidPhone,
    isValidSurname, isValidLastname,
    isValidBirthDate } = require('../../helpers/validate');
const {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    createAccountEmployee,
    updateEmployee,
    EmployeeStatus,
    existingPhone,
    existingEmail,
} = require('../../services/EmployeeServices');

const getAllEmployeesAPI = async (req, res) => {
    try {
        const employees = await getAllEmployees();
        res.status(200).json({
            success: true,
            data: employees,
            pagination: {}
        });
    } catch (error) {
        res.status(ERROR_CODES.COMMON.INTERNAL_ERROR).json({
            success: false,
            message: error.message
        });
    }
};
const getEmployeeByIdAPI = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await getEmployeeById(id);

        if (!employee) {
            return res.status(ERROR_CODES.COMMON.NOT_FOUND).json({
                success: false,
                message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.COMMON.NOT_FOUND]
            });
        }

        return res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {

        return res.status(ERROR_CODES.COMMON.INTERNAL_ERROR).json({
            success: false,
            message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.COMMON.INTERNAL_ERROR],
            error: error.message
        });
    }
};
const convertImageToBase64 = async (imagePath) => {
    try {
        // Đọc file ảnh từ đường dẫn
        const imageData = fs.readFileSync(imagePath);

        // Chuyển đổi dữ liệu ảnh thành chuỗi base64
        const base64Image = Buffer.from(imageData).toString('base64');

        return base64Image;
    } catch (error) {
        console.error('Error converting image to base64:', error);
        throw error;
    }
};
const postCreateEmployeeAPI = async (req, res) => {
    try {
        const { surname, lastname, identityNumber, image = "", gender, email, phone, birthdate } = req.body;
        // Kiểm tra các điều kiện đầu vào
        if (!surname || !isValidSurname(surname) || surname.trim() === "") {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.SUR_NAME] }
            );
        }
        if (!lastname || !isValidLastname(lastname) || lastname.trim() === "") {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.LAST_NAME] }
            );
        }
        if (!identityNumber || identityNumber.trim() === "") {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.IDENTITY_NUMBER] }
            );
        }
        if (email && !isValidEmail(email)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.EMAIL] }
            );
        }
        if (phone && !isValidPhone(phone)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.PHONE] }
            );
        }

        if (birthdate && !isValidBirthDate(birthdate)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.BIRTH_DATE] }
            );
        }
        const existingEmails = await existingEmail(email);
        const existingPhones = await existingPhone(phone);
        //Kiểm tra trùng Email
        if (existingEmails) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.EXISTING_EMAIL] }
            );
        }
        //Kiểm tra trùng số điện thoại
        if (existingPhones) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.EXISTING_PHONE] }
            );
        }

        let base64Image = "";
        if (image && fs.existsSync(image)) {
            base64Image = convertImageToBase64(image);
        }
        // Tạo nhân viên mới nếu dữ liệu hợp lệ
        const employees = await createEmployee({ ...req.body, image: base64Image });
        //Tạo tài khoản cho nhân viên mới
        const accountEmployees = await createAccountEmployee(employees);
        res.status(200).json(
            {
                success: true,
                data: employees,
                account: accountEmployees
            });
    } catch (error) {
        res.status(ERROR_CODES.COMMON.INTERNAL_ERROR).json(
            { success: false, message: error.message }
        );
    }
};
const putUpdateEmployeeAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const { surname, lastname, email, phone, image = "", gender, birthdate } = req.body;

        // Kiểm tra các điều kiện đầu vào
        if (!surname || !isValidSurname(surname) || surname.trim() === "") {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.SUR_NAME] }
            );
        }
        if (!lastname || !isValidLastname(lastname) || lastname.trim() === "") {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.LAST_NAME] }
            );
        }
        if (email && !isValidEmail(email)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.EMAIL] }
            );
        }
        if (phone && !isValidPhone(phone)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.PHONE] }
            );
        }
        if (birthdate && !isValidBirthDate(birthdate)) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.BIRTH_DATE] }
            );
        }
        // Lấy thông tin hiện tại của nhân viên
        const currentEmployee = await getEmployeeById(id);
        if (!currentEmployee) {
            return res.status(ERROR_CODES.COMMON.NOT_FOUND).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.COMMON.NOT_FOUND] }
            );
        }

        // So sánh dữ liệu mới và dữ liệu cũ
        const newData = { surname, lastname, email, phone, gender, birthdate };
        const isDataChanged = compareData(newData, currentEmployee);
        console.log("currentEmployee", currentEmployee);
        console.log("isDataChanged", isDataChanged);
        console.log("newData", newData);

        //kiểm tra dữ liệu có thay đổi không
        if (!isDataChanged) {
            return res.status(ERROR_CODES.COMMON.BAD_REQUEST).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.COMPARE_DATA] }
            );
        }
        // Cập nhật thông tin nhân viên nếu dữ liệu hợp lệ
        const updatedEmployee = await updateEmployee(id, newData);
        if (!updatedEmployee) {
            return res.status(ERROR_CODES.COMMON.NOT_FOUND).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.COMMON.NOT_FOUND] }
            );
        }
        // Trả về kết quả thành công
        res.status(200).json(
            { success: true, data: updatedEmployee }
        );
    } catch (error) {
        // Xử lý lỗi
        res.status(ERROR_CODES.COMMON.INTERNAL_ERROR).json(
            { success: false, message: error.message }
        );
    }
};
const statusEmployeeAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await EmployeeStatus(id);
        if (!employee) {
            return res.status(ERROR_CODES.COMMON.NOT_FOUND).json(
                { success: false, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.COMMON.NOT_FOUND] }
            );
        }
        res.status(200).json({ success: true, message: ERROR_MESSAGES.EMPLOYEE[ERROR_CODES.EMPLOYEE.DELETE_AT] });
    } catch (error) {
        res.status(ERROR_CODES.COMMON.INTERNAL_ERROR).json(
            { success: false, message: error.message }
        );
    }
};

module.exports = {
    getAllEmployeesAPI,
    getEmployeeByIdAPI,
    postCreateEmployeeAPI,
    putUpdateEmployeeAPI,
    statusEmployeeAPI,
};
