const ERROR_CODES = {
    SUCCESS: 0,
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
    }
    
};

const ERROR_MESSAGES = {
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