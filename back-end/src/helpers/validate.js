const Customer = require('../models/Customer');
const Employee = require('../models/Employee');

//Tạo ID cho nhân viên      
const generateEmployeeId = async () => {
    // Lấy danh sách tất cả ID đã tồn tại trong bảng, sắp xếp tăng dần
    const employees = await Employee.findAll({
        attributes: ['id'],
        order: [['id', 'ASC']]
    });
    if (employees.length === 0) {
        return 'EMP000001'; // Nếu bảng trống, bắt đầu từ EMP00001
    }
    // Tạo danh sách các số từ ID hiện tại (bỏ "EMP" và convert sang số)
    const existingIds = employees.map(emp => parseInt(emp.id.replace('EMP', ''), 10));
    // Tìm số nhỏ nhất bị thiếu trong danh sách
    for (let i = 1; i <= existingIds.length; i++) {
        if (!existingIds.includes(i)) {
            return `EMP${i.toString().padStart(5, '0')}`; // Nếu có lỗ hổng, dùng số đó
        }
    }
    // Nếu không có lỗ hổng, tăng ID như bình thường
    const nextId = existingIds[existingIds.length - 1] + 1;
    return `EMP${nextId.toString().padStart(6, '0')}`;
};

// Tạo ID cho khách hàng
const generateCustomerId = async () => {
    // Lấy danh sách tất cả ID đã tồn tại trong bảng, sắp xếp tăng dần
    const customer = await Customer.findAll({
        attributes: ['id'],
        order: [['id', 'ASC']]
    });
    if (customer.length === 0) {
        return 'CUS000001'; // Nếu bảng trống, bắt đầu từ CUS00001
    }
    // Tạo danh sách các số từ ID hiện tại (bỏ "EMP" và convert sang số)
    const existingIds = customer.map(emp => parseInt(emp.id.replace('CUS', ''), 10));
    // Tìm số nhỏ nhất bị thiếu trong danh sách
    for (let i = 1; i <= existingIds.length; i++) {
        if (!existingIds.includes(i)) {
            return `CUS${i.toString().padStart(5, '0')}`; // Nếu có lỗ hổng, dùng số đó
        }
    }
    // Nếu không có lỗ hổng, tăng ID như bình thường
    const nextId = existingIds[existingIds.length - 1] + 1;
    return `CUS${nextId.toString().padStart(6, '0')}`;
};

//kiểm tra email
const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com"];
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return false;

    const domain = email.split("@")[1].toLowerCase();
    return validDomains.includes(domain);
};

//kiểm tra số điện thoại
const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}
const isValidIdentityNumber = (identityNumber) => {
    const identityNumberRegex = /^[0-9]{9,12}$/;
    return identityNumberRegex.test(identityNumber);
}
//Kiểm tra họ 
const isValidSurname = (surname) => {
    const surnameRegex = /^[a-zA-Z]{2,15}$/;
    return surnameRegex.test(surname);
}
//Kiểm tra tên
const isValidLastname = (lastname) => {
    const lastnameRegex = /^[a-zA-Z]{2,15}$/;
    return lastnameRegex.test(lastname);
}

const isValidBirthDate = (birthdate) => {
    if (!birthdate) return false;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthdate)) return false;

    const dateObj = new Date(birthdate);
    const today = new Date();

    return !isNaN(dateObj.getTime()) && dateObj <= today; // Không phải ngày tương lai
};
//so sánh dữ liệu mới và dữ liệu cũ
const compareData = (newData, oldData) => {
    const newGender = newData.gender === 'true' ? true : newData.gender === 'false' ? false : newData.gender;
    const oldGender = oldData.gender;
    return (
        newData.surname !== oldData.surname ||
        newData.lastname !== oldData.lastname ||
        newData.identityNumber !== oldData.identityNumber ||
        newData.email !== oldData.email ||
        newData.phone !== oldData.phone ||
        newGender !== oldGender ||
        (newData.birthdate ? new Date(newData.birthdate).getTime() !== new Date(oldData.birthdate).getTime()
            : oldData.birthdate !== null)
    );
};
module.exports = {

}
const { Op } = require("sequelize");
const { get_error_response } = require('../helpers/response');
const { ERROR_CODES } = require("../docs/contants");

const isExistId = async (id, model) => {
    if (model && typeof model.findByPk === 'function') {
        const existingRecord = await model.findByPk(id);
        return !!existingRecord;
    }
    return false;
};

const validate_name = async (name, model, existingId = null, maxLength = 255, isUnique = true) => {
    if (!name) {
        return { error: "Tên không được để trống", code: 401 };
    }

    if (name.length > maxLength) {
        return { error: "Tên quá dài", code: 401 };
    }

    if (model && typeof model.findOne === "function" && isUnique) {
        const filterField = model.rawAttributes.ten ? "ten" : model.rawAttributes.ten_san_pham ? "ten_san_pham" : null;

        if (filterField) {
            const existingRecord = await model.findOne({
                where: {
                    [filterField]: name,
                    id: existingId ? { [Op.ne]: existingId } : { [Op.ne]: null }
                }
            });

            if (existingRecord) {
                return { error: "Tên đã tồn tại", code: 401 };
            }
        }
    } else if (Array.isArray(model) || model instanceof Set) {
        if (model.has(name) || model.includes(name)) {
            return { error: "Tên đã tồn tại", code: 401 };
        }
    }

    return null;
};

const validate_number = (number, start = 0, end = null, field = null) => {
    if (number === null || number === undefined) {
        return { error: "Giá trị không hợp lệ", code: 400 };
    }

    number = parseFloat(number);
    if (isNaN(number)) {
        return get_error_response(errorCode = ERROR_CODES.SHARED.NOT_NUMBER, status_code = 406,)
    }

    if (number < 0) {
        return get_error_response(errorCode = ERROR_CODES.SHARED.NUMBER_RANGE_100_INVALID, status_code = 406)
    }

    if (end && number > end) {
        return get_error_response(errorCode = ERROR_CODES.SHARED.NUMBER_RANGE_100_INVALID, status_code = 406)
    }

    return null;
};


// Kiểm tra email hợp lệ
const validate_email = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? null : { error: "Email không hợp lệ", code: 400 };
};

// Kiểm tra số điện thoại hợp lệ
const validate_phone = (phone) => {
    const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])\d{8}$/;
    return phoneRegex.test(phone) ? null : { error: "Số điện thoại không hợp lệ", code: 400 };
};

const validate_image = (image_base64) => {

}

module.exports = {
    isExistId,
    generateEmployeeId,
    generateCustomerId,
    isValidEmail,
    isValidPhone,
    isValidSurname,
    isValidLastname,
    isValidBirthDate,
    compareData,
    validate_name,
    validate_number,
    validate_email,
    validate_phone
};
