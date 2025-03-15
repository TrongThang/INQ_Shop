const { ERROR_CODES, MESSAGES } =  import("../docs/contants.js");

// export default function get_error_response (errorCode, status_code = 200, result = null, fieldError = null) {
//     // Xử lý thông điệp lỗi
//     const fieldErrorMessage = fieldError || '';
//     const errorName = Object.keys(ERROR_CODES).find(key => ERROR_CODES[key] === errorCode);
//     const message = fieldErrorMessage + (errorName && MESSAGES[errorName] ? MESSAGES[errorName] : 'Lỗi không xác định');

//     // Trả về object JSON
//     return res.status(status_code).json({
//         error: errorCode,
//         message: message,
//         data: result
//     });
// }

function get_error_response(errorCode, status_code = 200, result = null) {
    let errorList = [];

    // Nếu truyền vào là một mảng lỗi
    if (Array.isArray(errors)) {
        errorList = errors.map(({ errorCode, fieldError }) => {
            const errorName = Object.keys(ERROR_CODES).find(key => ERROR_CODES[key] === errorCode);
            const message = (fieldError || '') + (errorName && MESSAGES[errorName] ? MESSAGES[errorName] : 'Lỗi không xác định');
            return { error: errorCode, message };
        });
    } 

    const fieldErrorMessage = fieldError || '';
    const errorName = Object.keys(ERROR_CODES).find(key => ERROR_CODES[key] === errorCode);
    const message = fieldErrorMessage + (errorName && MESSAGES[errorName] ? MESSAGES[errorName] : 'Lỗi không xác định');

    // Trả về object JSON
    return res.status(status_code).json({
        error: errorCode,
        message: message,
        data: result
    });
}


module.exports = {
    get_error_response
}