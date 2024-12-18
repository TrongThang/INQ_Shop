const { where } = require('sequelize');
const Order = require('../models/Order');
const OrderDetail = require('../models/Order_detail');

const getAllOrder = async (idCustomer = null, status = null) => {
    const whereCondition = {}

    if (idCustomer) {
        whereCondition.idCustomer = idCustomer;
    }

    if (status)
    {
        whereCondition.status = status;
    }

    const orders = await Order.findAll({
        where: whereCondition
    });

    return orders;
}

const getDetailOrder = async (idOrder, idCustomer = null) => {
    const whereCondition = {
        id: idOrder
    }

    if (idCustomer) {
        whereCondition.idCustomer = idCustomer;
    }

    const order = await Order.findAll({
        where: whereCondition,
        include: [
            {
                model: OrderDetail,
                as: 'orderDetail'
            }
        ]
    });

    return order;
}

module.exports = {
    getCartInCookie, saveCartInCookie, 
    addToCartInCookie, updateQuantityDeviceInCartCookie,
    removeDeviceCartInCookie
}