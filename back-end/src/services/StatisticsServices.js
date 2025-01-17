const Device = require('../models/Device');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const { Op } = require('sequelize');
const OrderDetail = require('../models/Order_detail');
const sequelize = require('../config/database');

const getObjectCounts = async (period) => {
    let startDate, endDate;
    const now = new Date();

    if (period === "day") {
        startDate = new Date(now.setHours(0, 0, 0, 0));
        endDate = new Date();
    } else if (period === "month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1); 
        endDate = new Date();
    } else if (period === "year") {
        startDate = new Date(now.getFullYear() - 1, 0, 1); 
        endDate = new Date(now.getFullYear(), 11, 31);
        endDate.setHours(23, 59, 59, 999);
    } else {
        throw new Error("Period không hợp lệ. Chỉ chấp nhận 'day', 'month' hoặc 'year'.");
    }

    const Revenue = await Order.sum("totalAmount", {
        where: {
            updated_at: {
                [Op.between]: [startDate, endDate],
            },
            status: {
                [Op.gte]: 1
            }
        },
    });

    const CountCustomerSold = await Order.count({
        where: {
            updated_at: {
                [Op.between]: [startDate, endDate],
            },
            status: {
                [Op.gte]: 1
            }
        },
    });

    const [results, metadata] = await sequelize.query(`
        SELECT SUM(order_detail.stock) AS total_deviceSold
        FROM order_detail
        JOIN \`order\` o ON order_detail.id = o.id
        WHERE o.updated_at 
            BETWEEN
                '${startDate.toISOString().slice(0, 19).replace('T', ' ')}'
            AND '${endDate.toISOString().slice(0, 19).replace('T', ' ')}'
            AND o.status >= 1;  
    `, {
        replacements: { startDate, endDate },
        type: sequelize.QueryTypes.SELECT,
    });

    const TotalDeviceSold = results ? Number(results.total_deviceSold) : 0;
    
    const previousData = await getPreviousObjectCounts(period);

    const RevenuePercentageChange = calculatePercentageChange(Revenue, previousData.Revenue)
    const TotalDeviceSoldPercentageChange = calculatePercentageChange(TotalDeviceSold, previousData.TotalDeviceSold)
    const CountCustomerSoldPercentageChange = calculatePercentageChange(CountCustomerSold, previousData.CountCustomerSold)

    console.log('CountCustomerSold Value:', CountCustomerSold, previousData.CountCustomerSold)

    console.log('Growth Value:', RevenuePercentageChange, TotalDeviceSoldPercentageChange, CountCustomerSoldPercentageChange)

    return {
        Revenue, TotalDeviceSold, CountCustomerSold,
        RevenuePercentageChange, TotalDeviceSoldPercentageChange, CountCustomerSoldPercentageChange
    };
};

const getPreviousObjectCounts = async (period) => {
    let startDate, endDate;
    const now = new Date();

    if (period === "day") {
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 1); // Giảm 1 ngày
        startDate.setHours(0, 0, 0, 0); // Đặt thời gian bắt đầu là 0h:0m:0s:0ms

        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
    } else if (period === "month") {
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0); 
        endDate.setHours(23, 59, 59, 999); 
    } else if (period === "year") {
        startDate = new Date(now.getFullYear() - 1, 0, 1); 
        endDate = new Date(now.getFullYear() - 1, 11, 31);
        endDate.setHours(23, 59, 59, 999);
    } else {
        throw new Error("Period không hợp lệ. Chỉ chấp nhận 'day', 'month' hoặc 'year'.");
    }

    let Revenue = await Order.sum("totalAmount", {
        where: {
            updated_at: {
                [Op.between]: [startDate, endDate],
            },
            status: {
                [Op.gte]: 1
            }
        },
    });

    const CountCustomerSold = await Order.count({
        where: {
            updated_at: {
                [Op.between]: [startDate, endDate],
            },
            status: {
                [Op.gte]: 1
            }
        },
    });

    const [results, metadata] = await sequelize.query(`
        SELECT SUM(order_detail.stock) AS total_deviceSold
        FROM order_detail
        JOIN \`order\` o ON order_detail.id = o.id
        WHERE o.updated_at 
            BETWEEN
                '${startDate.toISOString().slice(0, 19).replace('T', ' ')}'
            AND '${endDate.toISOString().slice(0, 19).replace('T', ' ')}'
            AND o.status >= 1;  
    `, {
        replacements: { startDate, endDate },
        type: sequelize.QueryTypes.SELECT,
    });

    Revenue = Revenue === null ? 0 : Revenue;  
    const TotalDeviceSold = results ? Number(results.total_deviceSold) : 0 ;

    return { Revenue, TotalDeviceSold, CountCustomerSold };
};

const calculatePercentageChange = (currentValue, previousValue) => {
    if (previousValue === 0 || previousValue === null) {
        return 100;
    }
    console.log(currentValue, "-", previousValue, (currentValue - previousValue))
    return ((currentValue - previousValue) / previousValue) * 100;
};

module.exports = {
    getObjectCounts
};

