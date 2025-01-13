const { where, Model } = require('sequelize');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Device = require('../models/Device');
const { checkDevice } = require('./DeviceServices');
const { ERROR_CODES, ERROR_MESSAGES } = require('../config/contants');
const OrderDetail = require('../models/Order_detail');

const getAllOrder = async (idCustomer) => {
    // const orders = await Order.findAll({
    //     where: { idCustomer },
    //     include: [
    //         {
    //             model: Order_detail,
    //             as: 'details',
    //             attribute: [ 'price', 'stock', 'amount',],
    //             include: [{
    //                 model: Device,
    //                 as: 'device',
    //                 attribute: ['image']
    //             }]
    //         }
    //     ]
    // });
    // return orders;
}

const checkCustomerOrderForDevice  = async (idCustomer, idDevice) => {
    const orders = await Order.findAll({
        where: {
            idCustomer: idCustomer
        },
        include: [
            {
                model: Order_detail,
                as: 'order_device',
                where: {
                    idDevice: idDevice
                }
            }
        ]
    });

    return orders.length > 0
}

//Input: Danh sách Sản phẩm cần thanh toán - Gọi sản phẩm để phân biệt với thiết bị trong quá trình xử lý
//Output: Đặt đơn hàng thành công với danh sách thiết bị KH muốn mua
//Validation: Các thiết bị phải < số lượng sản phẩm trong kho && Giá bán trong hệ thống và giá bán khi khách hàng mua phải giống nhau   
//Process:
const checkListProduct = async (products) => {
    try {
        for (const product of products) {
            const result = await checkDevice(product);

            if (result.errorCode !== ERROR_CODES.DEVICE.SUCCESS) {
                return result;
            }
        }
        return {
            errorCode: ERROR_CODES.SUCCESS,
            
        }
    } catch (error) {
        return {
            errorCode: ERROR_CODES.ORDER.INTERNAL_ERROR,
            detail: error.message || ERROR_MESSAGES.ORDER[ERROR_CODES.ORDER.INTERNAL_ERROR]
        }
    }
}

const createOrder = async (infoOrder, products) => {
    const result = await checkListProduct(products);

    if (result.errorCode !== ERROR_CODES.SUCCESS) {
        return result;
    }

    const newOrder = await Order(infoOrder);
    if (!newOrder) {
        return {
            errorCode: ERROR_CODES.ORDER.ERROR_CREATE,
            messages: ERROR_MESSAGES.ORDER[ERROR_CODES.ORDER.ERROR_CREATE] 
        }
    }
    for (const product of products) {
        const detail_order = await OrderDetail.create({
            id: newOrder.id,
            idProduct: product.idDevice,
            price: product.sellingDetail,
            stock: product.quantity,
            amount: product.sellingDetail * product.quantity,
            status: 1,
        });
    }

    return {
        errorCode: ERROR_CODES.SUCCESS,
        message: ERROR_MESSAGES.ORDER[ERROR_CODES.SUCCESS]
    }
}

module.exports = {
    getAllOrder,
    checkCustomerOrderForDevice,
    createOrder
}