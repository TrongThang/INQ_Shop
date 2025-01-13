const STATUS_CODES = {
    ORDER: {
        CANCELLED: 0,
        PENDING: 1,
        PREPARING: 2,
        DELIVERING: 3,
        FINISH: 4,
        PAID: 5,
        REFUNDED: 6,
    }
}

module.exports = {
    STATUS_CODES
};