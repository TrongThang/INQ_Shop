const ERROR_CODES = {
    SUCCESS: 0,
    SHARED: {
        NUMBER_RANGE_100_INVALID: 1,
        PHONE_INVALID: 2,
        EMAIL_INVALID: 3,
        NOT_NUMBER: 4,
    },
    DEVICE: {
        DEVICE_NOT_FOUND: 1,
        DEVICE_NON_ACTIVE: 2,
        PRICE_CHANGED: 3,
        OUT_OF_STOCK: 4,
        NAME_CHANGED: 5,
        NAME_EXISTED: 6,
        INTERNAL_ERROR: 500,
    },
    ATTRIBUTE: {
        NOT_FOUND: 1,
        NAME_EXISTED: 2
    },
    CATEGORY: {
        NOT_FOUND: 1,
    },
    UNIT: {
        NOT_FOUND: 1
    },
    WARRANTY_TIME: {
        NOT_FOUND: 1
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
    }
    
};

const ERROR_MESSAGES = {
    SHARED: {
        [ERROR_CODES.SHARED.NUMBER_RANGE_100_INVALID]: "Số từ 0 đến 99",
        [ERROR_CODES.SHARED.EMAIL_INVALID]: "Email không hợp lệ!",
        [ERROR_CODES.SHARED.PHONE_INVALID]: "Số điện thoại không hợp lệ",
        [ERROR_CODES.SHARED.NOT_NUMBER]: "Bắt buộc là số!"
    },
    DEVICE: {
        [ERROR_CODES.SUCCESS]: 'Kiểm tra thành công, không có sự thay đổi nào của thiết bị',
        [ERROR_CODES.DEVICE.DEVICE_NOT_FOUND]: 'Không tồn tại thiết bị',
        [ERROR_CODES.DEVICE.DEVICE_NON_ACTIVE]: 'Thiết bị không còn được bán',
        [ERROR_CODES.DEVICE.PRICE_CHANGED]: 'Thiết bị có sự thay đổi về giá tiền',
        [ERROR_CODES.DEVICE.OUT_OF_STOCK]: 'Thiết bị không đủ số lượng để mua hàng',
        [ERROR_CODES.DEVICE.NAME_CHANGED]: 'Tên thiết bị có thay đổi',
        [ERROR_CODES.DEVICE.INTERNAL_ERROR]: 'Lỗi nội bộ của máy chủ'
    },
    CATEGORY: {
        [ERROR_CODES.SUCCESS]: 'Thao tác với danh mục thành công',
        [ERROR_CODES.CATEGORY.NOT_FOUND]: 'Không tìm thấy danh mục yêu cầu!',
    },
    UNIT: {
        [ERROR_CODES.SUCCESS]: 'Thao tác với đơn vị tính thành công',
        [ERROR_CODES.UNIT.NOT_FOUND]: 'Không tìm thấy đơn vị tính yêu cầu!',
    },
    WARRANTY_TIME: {
        [ERROR_CODES.SUCCESS]: 'Thao tác với thời gian bảo hành thành công',
        [ERROR_CODES.WARRANTY_TIME.NOT_FOUND]: 'Không tìm thấy thời gian bảo hành yêu cầu!',
    },
    ATTRIBUTE: {
        [ERROR_CODES.ATTRIBUTE.NOT_FOUND]: "Không tìm thấy thuộc tính!",
        [ERROR_CODES.ATTRIBUTE.NAME_EXISTED]: "Tên thuộc tính đã tồn tại!"
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