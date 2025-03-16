const Account = require("./back-end/src/models/Account");

const ERROR_CODES = {
    SUCCESS: 0,
    COMMON: {
        //lỗi không tìm thấy
        NOT_FOUND: 404,
        //lỗi request
        BAD_REQUEST: 400,
        //lỗi mấy chủ
        INTERNAL_ERROR: 500
    },
    DEVICE: {
        DEVICE_NOT_FOUND: 1,
        DEVICE_NON_ACTIVE: 2,
        PRICE_CHANGED: 3,
        OUT_OF_STOCK: 4,
        INTERNAL_ERROR: 500,
    },
    ORDER: {
        INTERNAL_ERROR: 500,
        ERROR_CREATE: 1,
        CANNOT_CANCEL: 2,
        ERROR_UPDATE: 3,
    },
    PAYMENT: {
        FAILED: 7,
        INVALID_METHOD: 8,
        INTERNAL_ERROR: 9,
    },
    EMPLOYEE: {
        NON_ACTIVE: 11,
        SUR_NAME: 1,
        LAST_NAME: 2,
        IDENTITY_NUMBER: 3,
        EMAIL: 4,
        PHONE: 5,
        BIRTH_DATE: 6,
        EXISTING_EMAIL: 7,
        EXISTING_PHONE: 8,
        COMPARE_DATA: 9,
        DELETE_AT: 10
    },
    CUSTOMER: {
        SUR_NAME: 1,
        LAST_NAME: 2,
        IDENTITY_NUMBER: 3,
        EMAIL: 4,
        PHONE: 5,
        BIRTH_DATE: 6,
        EXISTING_EMAIL: 7,
        EXISTING_PHONE: 8,
        COMPARE_DATA: 9,
        DELETE_AT: 10
    },
    ACCOUNT: {
        EXISTING_ACCOUNT: 1
    }
};

const ERROR_MESSAGES = {
    ACCOUNT: {
        [ERROR_CODES.ACCOUNT.EXISTING_ACCOUNT]: 'Tài khoản đã tồn tại'
    },
    EMPLOYEE: {
        [ERROR_CODES.SUCCESS]: 'Kiểm tra thành công',
        [ERROR_CODES.EMPLOYEE.SUR_NAME]: 'Họ phải chứa từ 2 - 15 chữ cái (không bao gồm số và ký tự đặc biệt).',
        [ERROR_CODES.EMPLOYEE.LAST_NAME]: 'Tên phải chứa từ 2 - 15 chữ cái (không bao gồm số và ký tự đặc biệt).',
        [ERROR_CODES.EMPLOYEE.IDENTITY_NUMBER]: 'Identity Number bắt buộc phải có dữ liệu',
        [ERROR_CODES.EMPLOYEE.EMAIL]: 'Email không hợp lệ',
        [ERROR_CODES.EMPLOYEE.PHONE]: 'Số điện thoại không hợp lệ',
        [ERROR_CODES.EMPLOYEE.BIRTH_DATE]: 'Ngày sinh không hợp lệ',
        [ERROR_CODES.EMPLOYEE.EXISTING_EMAIL]: "Email đã tồn tại",
        [ERROR_CODES.EMPLOYEE.EXISTING_PHONE]: "Số điện thoại đã tồn tại",
        [ERROR_CODES.EMPLOYEE.NON_ACTIVE]: 'Nhân viên không còn hoạt động',
        [ERROR_CODES.EMPLOYEE.COMPARE_DATA]: 'Không phát hiện thay đổi nào. Dữ liệu nhân viên vẫn giữ nguyên.',
        [ERROR_CODES.EMPLOYEE.DELETE_AT]: 'Xóa nhân viên thành công',
        [ERROR_CODES.COMMON.NOT_FOUND]: 'Nhân viên không tồn tại',
        [ERROR_CODES.COMMON.INTERNAL_ERROR]: 'Lỗi nội bộ của máy chủ khi xử lý tìm nhân viên',
    },
    CUSTOMER: {
        [ERROR_CODES.SUCCESS]: 'Kiểm tra thành công',
        [ERROR_CODES.CUSTOMER.SUR_NAME]: 'Họ phải chứa từ 2 - 15 chữ cái (không bao gồm số và ký tự đặc biệt).',
        [ERROR_CODES.CUSTOMER.LAST_NAME]: 'Tên phải chứa từ 2 - 15 chữ cái (không bao gồm số và ký tự đặc biệt).',
        [ERROR_CODES.CUSTOMER.IDENTITY_NUMBER]: 'Identity Number bắt buộc phải có dữ liệu',
        [ERROR_CODES.CUSTOMER.EMAIL]: 'Email không hợp lệ',
        [ERROR_CODES.CUSTOMER.PHONE]: 'Số điện thoại không hợp lệ',
        [ERROR_CODES.CUSTOMER.BIRTH_DATE]: 'Ngày sinh không hợp lệ',
        [ERROR_CODES.CUSTOMER.EXISTING_EMAIL]: "Email đã tồn tại",
        [ERROR_CODES.CUSTOMER.EXISTING_PHONE]: "Số điện thoại đã tồn tại",
        [ERROR_CODES.CUSTOMER.NON_ACTIVE]: 'Khách hàng không còn hoạt động',
        [ERROR_CODES.CUSTOMER.COMPARE_DATA]: 'Không phát hiện thay đổi nào. Dữ liệu khách hàng vẫn giữ nguyên.',
        [ERROR_CODES.CUSTOMER.DELETE_AT]: 'Xóa khách hàng thành công',
        [ERROR_CODES.COMMON.NOT_FOUND]: 'Khách hàng không tồn tại',
        [ERROR_CODES.COMMON.INTERNAL_ERROR]: 'Lỗi nội bộ của máy chủ khi xử lý tìm Khách hàng',
    },
    DEVICE: {
        [ERROR_CODES.SUCCESS]: 'Kiểm tra thành công, không có sự thay đổi nào của thiết bị',
        [ERROR_CODES.DEVICE.DEVICE_NOT_FOUND]: 'Không tồn tại thiết bị',
        [ERROR_CODES.DEVICE.DEVICE_NON_ACTIVE]: 'Thiết bị không còn được bán',
        [ERROR_CODES.DEVICE.PRICE_CHANGED]: 'Thiết bị có sự thay đổi về giá tiền',
        [ERROR_CODES.DEVICE.OUT_OF_STOCK]: 'Thiết bị không đủ số lượng để mua hàng',
        [ERROR_CODES.DEVICE.INTERNAL_ERROR]: 'Lỗi nội bộ của máy chủ'
    },
    ORDER: {
        [ERROR_CODES.SUCCESS]: 'Kiểm tra thành công, đơn hàng được tạo thành công',
        [ERROR_CODES.ORDER.ERROR_CREATE]: 'Lỗi không thể tạo được đơn hàng',
        [ERROR_CODES.ORDER.ERROR_UPDATE]: 'Lỗi không thể cập nhật được đơn hàng',
        [ERROR_CODES.ORDER.CANNOT_CANCEL]: 'Lỗi không thể hủy được đơn hàng',
        [ERROR_CODES.ORDER.INTERNAL_ERROR]: 'Lỗi nội bộ máy chủ khi xử lý thanh toán đơn hàng'
    },
    PAYMENT: {
        [ERROR_CODES.PAYMENT.FAILED]: 'Thanh toán thất bại',
        [ERROR_CODES.PAYMENT.INVALID_METHOD]: 'Phương thức thanh toán không hợp lệ',
        [ERROR_CODES.PAYMENT.INTERNAL_ERROR]: 'Lỗi nội bộ của máy chủ khi xử lý thanh toán',
    }
};

module.exports = {
    ERROR_CODES,
    ERROR_MESSAGES
};