const { where, Model } = require('sequelize');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Order_detail = require('../models/Order_detail');
const Device = require('../models/Device');

const getAllOrder = async (idCustomer) => {
    const orders = await Order.findAll({
        where: { idCustomer },
        include: [
            {
                model: Order_detail,
                as: 'order_detail',
                attribute: [ 'price', 'stock', 'amount',],
                include: [{
                    model: Device,
                    as: 'device',
                    attribute: ['image']
                }]
            }
        ]
    });
    return orders;
}

const checkCustomerOrderForDevice  = async (idCustomer, idDevice) => {
    const orders = await Order.findAll({
        where: {
            idCustomer: idCustomer
        },
        include: [
            {
                model: OrderDetail,
                as: 'details',
                where: {
                    idDevice: idDevice
                }
            }
        ]
    });

    return orders.length > 0
}

module.exports = {
    getAllOrder,
    checkCustomerOrderForDevice,
}