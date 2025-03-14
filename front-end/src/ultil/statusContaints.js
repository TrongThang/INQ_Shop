const STATUS_CODES = {
    ORDER: {
        CANCELLED: 0,
        PENDING: 1,
        PREPARING: 2,
        DELIVERING: 3,
        FINISH: 4,
        PAID: 5,
        REFUNDED: 6,
    },
    DEVICE: {
        NON_ACTIVE: 0,
        ACTIVE: 1,
        DISCOUNT: 2,
        FEATURED: 3,
        NEW: 4,
    },
    CONTACT: {
            
    }
}

module.exports = {
    STATUS_CODES
};