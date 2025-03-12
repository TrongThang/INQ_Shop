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

const validate_number = (number, range = null) => {
    if (number === null || number === undefined) {
        return { error: "Giá trị không hợp lệ", code: 400 };
    }

    number = parseFloat(number);
    if (isNaN(number)) {
        return get_error_response(errorCode = ERROR_CODES.SHARED.NOT_NUMBER, status_code = 406)
    }

    if (number < 0) {
        return get_error_response(errorCode = ERROR_CODES.SHARED.NUMBER_RANGE_100_INVALID, status_code = 406)
    }
    
    if (range && number > range) {
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

module.exports = { isExistId, validate_name, validate_number, validate_email, validate_phone };