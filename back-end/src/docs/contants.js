const ERROR_CODES = {
    SUCCESS: 0,
    SHARED: {
        NUMBER_RANGE_100_INVALID: 1,
        PHONE_INVALID: 2,
        EMAIL_INVALID: 3,
        NOT_NUMBER: 4,
        PREPAID_INVALID: 5,
        REMAINING_INVALID: 6,
        TOTAL_MONEY_INVALID: 7
    },
    // DEVICE - 1xxx
    DEVICE: {
        DEVICE_NOT_FOUND: 1001,
        DEVICE_NON_ACTIVE: 1002,
        PRICE_CHANGED: 3,
        OUT_OF_STOCK: 4,
        NAME_CHANGED: 5,
        NAME_EXISTED: 6,
        INTERNAL_ERROR: 500,
    },
    // ATTRIBUTE - 2xxx
    ATTRIBUTE: {
        SUCCESS: 1000,
        NOT_FOUND: 1001,
        NAME_EXISTED: 2
    },

    //  CATEGORY - 3xxx
    CATEGORY: {
        NOT_FOUND: 1,
    },

    //  UNIT - 4xxx
    UNIT: {
        NOT_FOUND: 1
    },

    //  WARRANTY_TIME - 5xxx
    WARRANTY_TIME: {
        NOT_FOUND: 1
    },

    //  ORDER - 6xxx
    ORDER: {
        SUCCESS: 6000,
        NOT_FOUND: 6001,
        CREATE_FAILED: 6002,
        UPDATED_FAILED: 6003,
        DELETED_FAILED: 6004,
        SALE_PRICE_NOT_SAME: 6005,
        IMPORT_PRICE_NOT_SAME: 6006,
        AMOUNT_IS_LIMIT: 6007, 
        QUANTITY_IS_LIMIT: 6008, 
        INFO_DEVICES_IS_CHANGED: 6009,
        TOTAL_IMPORT_NOT_NUMBER: 6010,
        TOTAL_MONEY_NOT_NUMBER: 6011,
        AMOUNT_NOT_NUMBER: 6012,
        PREPAID_NOT_NUMBER: 6013,
        DISCOUNT_NOT_NUMBER: 6014,
        VAT_NOT_NUMBER: 6015,
    },
    
    //  PAYMENT - 7xxx
    PAYMENT: {
        FAILED: 7,
        INVALID_METHOD: 8,
        INTERNAL_ERROR: 9,
    },
    
    //  WAREHOUSE - 8xxx
    WAREHOUSE: {
        SUCCESS: 8000,
        NOT_FOUND: 8001,
        NAME_EXISTED: 8002,
        REFERENCE_IMPORT_INVOICE: 8003,
        CREATE_FAILED: 8004,
        UPDATED_FAILED: 8005,
        DELETED_FAILED: 8006,
    },

    //  WAREHOUSE - 9xxx
    IMPORT_WAREHOUSE: {
        SUCCESS: 8000,
        NOT_FOUND: 8001,
        CREATE_FAILED: 8002,
        UPDATED_FAILED: 8003,
        DELETED_FAILED: 8004,
        IMPORT_DATE_INVALID: 8005,
        HAVED_QUANTIY_IN_WAREHOUSE_INVENTORY: 8006,
        
    },
    
    //  EMPLOYEE - 11xx
    EMPLOYEE: {
        SUCCESS: 1100,
        NOT_FOUND: 1101,
        CREATE_FAILED: 1102,
        UPDATED_FAILED: 1103,
        DELETED_FAILED: 1104,
    },

    //  SUPPLIER - 12xx
    SUPPLIER: {
        SUCCESS: 1200,
        NOT_FOUND: 1201,
        CREATE_FAILED: 1202,
        UPDATED_FAILED: 1203,
        DELETED_FAILED: 1204,
    },

    //  DETAIL IMPORT - 13xx
    DETAIL_IMPORT: {
        SUCCESS: 1300,
        NOT_FOUND: 1301,
        CREATE_FAILED: 1302,
        UPDATED_FAILED: 1303,
        DELETED_FAILED: 1304,
        IMPORT_DATE_INVALID: 1305,
        HAVED_QUANTIY_IN_WAREHOUSE_INVENTORY: 1306,
        NOT_GIFT: 1307,
        AMOUNT_INVALID: 1308, 

    },

    // CUSTOMER - 14xx
    CUSTOMER: {
        SUCCESS: 1400,
        NOT_FOUND: 1401,
        CREATE_FAILED: 1402,
        UPDATED_FAILED: 1403,
        DELETED_FAILED: 1404,
    },

    //DETAIL ORDER - 15xx
    DETAIL_ORDER: {
        SUCCESS: 1500,
        NOT_FOUND: 1501,
        CREATE_FAILED: 1502,
        UPDATED_FAILED: 1503,
        DELETED_FAILED: 1504,
        SALE_PRICE_NOT_SAME: 1505,
        IMPORT_PRICE_NOT_SAME: 1506,
        AMOUNT_NOT_SAME: 1507, 
        QUANTITY_IS_LIMIT: 1508,
        IMPORT_PRICE_NOT_NUMBER: 1510,
        SALE_PRICE_NOT_NUMBER: 1511,
        AMOUNT_NOT_NUMBER: 1512,
        DISCOUNT_NOT_NUMBER: 1514,
        VAT_NOT_NUMBER: 6015,
    },
};

const ERROR_MESSAGES = {
    [ERROR_CODES.SHARED.NUMBER_RANGE_100_INVALID]: "Số từ 0 đến 99",
    [ERROR_CODES.SHARED.EMAIL_INVALID]: "Email không hợp lệ!",
    [ERROR_CODES.SHARED.PHONE_INVALID]: "Số điện thoại không hợp lệ",
    [ERROR_CODES.SHARED.NOT_NUMBER]: "Bắt buộc là số!",
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
        [ERROR_CODES.SUCCESS]: 'Thao tác với đơn hàng thành công!',
        [ERROR_CODES.ORDER.ERROR_CREATE]: 'Lỗi không thể tạo được đơn hàng',
        [ERROR_CODES.ORDER.ERROR_UPDATE]: 'Lỗi không thể cập nhật được đơn hàng',
        [ERROR_CODES.ORDER.CANNOT_CANCEL]: 'Lỗi không thể hủy được đơn hàng',

        [ERROR_CODES.ORDER.NOT_FOUND]: 'Không tồn tại đơn hàng được yêu cầu!',
        [ERROR_CODES.ORDER.CREATE_FAILED]: 'Tạo đơn hàng mới thất bại!',
        [ERROR_CODES.ORDER.UPDATED_FAILED]: 'Cập nhật đơn hàng thất bại!',
        [ERROR_CODES.ORDER.DELETED_FAILED]: 'Xoá đơn hàng thất bại!',
        [ERROR_CODES.ORDER.SALE_PRICE_NOT_SAME]: 'Tổng tiền bán của đơn hàng gửi về không giống tổng tiền được tính toán!',
        [ERROR_CODES.ORDER.IMPORT_PRICE_NOT_SAME]: 'Giá nhập của các thiết bị trong đơn hàng gửi về không giống tính toán!',
        [ERROR_CODES.ORDER.AMOUNT_IS_LIMIT]: 'Thành tiền của đơn hàng gửi về không giống tính toán!',
        [ERROR_CODES.ORDER.QUANTITY_IS_LIMIT]: 'Số lượng sản phẩm của lô hàng này không đủ đáp ứng!',
        [ERROR_CODES.ORDER.INFO_DEVICES_IS_CHANGED]: 'Thông tin của một vài sản phẩm có sự thay đổi!'
    },
    PAYMENT: {
        [ERROR_CODES.PAYMENT.FAILED]: 'Thanh toán thất bại',
        [ERROR_CODES.PAYMENT.INVALID_METHOD]: 'Phương thức thanh toán không hợp lệ',
        [ERROR_CODES.PAYMENT.INTERNAL_ERROR]: 'Lỗi nội bộ của máy chủ khi xử lý thanh toán',
    },
    WAREHOUSE: {
        [ERROR_CODES.WAREHOUSE.SUCCESS]: 'Thao tác với kho hàng thành công!',
        [ERROR_CODES.WAREHOUSE.NOT_FOUND]: 'Kho hàng không tồn tại!',
        [ERROR_CODES.WAREHOUSE.NAME_EXISTED]: 'Tên kho hàng đã tồn tại',
        [ERROR_CODES.WAREHOUSE.REFERENCE_IMPORT_INVOICE]: 'Kho hàng có tham chiến tới hoá đơn nhập kho',
        [ERROR_CODES.WAREHOUSE.CREATE_FAILED]: 'Tạo kho hàng mới thất bại!',
        [ERROR_CODES.WAREHOUSE.UPDATED_FAILED]: 'Cập nhật kho hàng thất bại!',
        [ERROR_CODES.WAREHOUSE.DELETED_FAILED]: 'Xoá kho hàng thất bại!',
    },
    IMPORT_WAREHOUSE: {
        [ERROR_CODES.IMPORT_WAREHOUSE.SUCCESS]: 'Thao tác với hoá đơn nhập hàng thành công!',
        [ERROR_CODES.IMPORT_WAREHOUSE.NOT_FOUND]: 'Không tồn tại hoá đơn nhập hàng yêu cầu!',
        [ERROR_CODES.IMPORT_WAREHOUSE.CREATE_FAILED]: 'Tạo hoá đơn nhập hàng thất bại!',
        [ERROR_CODES.IMPORT_WAREHOUSE.UPDATED_FAILED]: 'Cập nhật hoá đơn nhập hàng thất bại!',
        [ERROR_CODES.IMPORT_WAREHOUSE.DELETED_FAILED]: 'Xoá hoá đơn nhập hàng thất bại!',
        [ERROR_CODES.IMPORT_WAREHOUSE.IMPORT_DATE_INVALID]: 'Ngày nhập hàng không hợp lệ!',
        [ERROR_CODES.IMPORT_WAREHOUSE.HAVED_QUANTIY_IN_WAREHOUSE_INVENTORY]: 'Vẫn còn sản phẩm tồn trong kho hàng!',
        
    },
    
};

module.exports = {
    ERROR_CODES,
    ERROR_MESSAGES
};