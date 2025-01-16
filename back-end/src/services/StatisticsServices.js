const Device = require('../models/Device');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

const getObjectCounts = async () => {
    const deviceCount = await Device.count();
    const customerCount = await Customer.count();
    const orderCount = await Order.count();

    return {
        deviceCount,
        customerCount,
        orderCount
    };
};

module.exports = {
    getObjectCounts
};

