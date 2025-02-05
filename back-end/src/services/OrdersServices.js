const { where, Model } = require('sequelize');
const { Op, Sequelize } = require('sequelize');
const Order = require('../models/Order');
const Employee = require('../models/Employee');
const Customer = require('../models/Customer');
const Device = require('../models/Device');
const { checkDevice, getCheckNameDevice } = require('./DeviceServices');
const { ERROR_CODES, ERROR_MESSAGES } = require('../../../contants');
const OrderDetail = require('../models/Order_detail');
const { STATUS_CODES } = require('../../../statusContaints');
const Warehouse = require('../models/Warehouse');

const getAllOrder = async () => {
    const orders = await Order.findAll({
        include: [{
            model: Customer,
            as: 'customer',
            attributes: ['surname', 'lastname']
        }]
    });
    return orders;
}
const getAllOrder_RevenueStatistics = async (status) => {
    const orders = await Order.findAll({
        where: {
          status: {
            [Op.eq]: status
          }
        }
    });
    return orders;
}

const getAllOrderByIdCustomer = async (idCustomer) => {
    const orders = await Order.findAll({
        where: { idCustomer },
        include: [
            {
                model: OrderDetail,
                as: 'order_device',
                attributes: ['price', 'stock', 'amount',],
                include: [{
                    model: Device,
                    as: 'device',
                    attributes: ['image', 'slug']
                }]
            }
        ],
        order: [['created_at', 'DESC']]
    });
    return orders;
}

const getByIdOrder = async (idOrder) => {
    const orders = await Order.findByPk(idOrder,
        {
            include: [
                {
                    model: OrderDetail,
                    as: 'order_device',
                    attributes: ['price', 'stock', 'amount',],
                    include: [{
                        model: Device,
                        as: 'device',
                        attributes: ['image', 'name', 'idDevice']
                    }]
                },
                {
                    model: Employee,
                    as: 'employee',
                    attributes: ['surname', 'lastname'],
                }
            ]
        }
    );
    return orders;
}

const checkCustomerOrderForDevice = async (idCustomer, idDevice) => {
    console.log('check order:', idDevice, idCustomer )
    const orders = await Order.findAll({
        where: {
            idCustomer: idCustomer
        },
        include: [
            {
                model: OrderDetail,
                as: 'order_device',
                where: {
                    idDevice: idDevice
                }
            }
        ]
    });
    console.log('check order:', orders)

    return orders.length > 0
}

//Input: Danh sách Sản phẩm cần thanh toán - Gọi sản phẩm để phân biệt với thiết bị trong quá trình xử lý
//Output: Đặt đơn hàng thành công với danh sách thiết bị KH muốn mua
//Validation: Các thiết bị phải < số lượng sản phẩm trong kho && Giá bán trong hệ thống và giá bán khi khách hàng mua phải giống nhau   
//Process:
const checkListProduct = async (products) => {
    try {
        const devicesChanged = [];
        for (const product of products) {
            const result = await checkDevice(product);

            if (result.errorCode !== ERROR_CODES.SUCCESS) {
                devicesChanged.push(result);
            }
        }

        if (devicesChanged.length > 0) {
            return devicesChanged;
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
    // nếu như có 2 sản phấm giống nhau thì sao
    const devicesChanged = await checkListProduct(products);
    
    console.log('devicesChanged:', devicesChanged)
    if (devicesChanged.length > 0) {
        const data = {
            message: "Thiết bị trong đơn hàng có thay đổi!",
            devicesChanged,
        }
        return data;
    }

    //Nên + trước hay tạo xong chi tiết hoá đơn r mới tính total Amount?
    // Đã có checkListProduct đảm bảo sản phẩm có tồn tại   
    const totalAmount = products.reduce((acc, item) => acc + (item.quantity * item.sellingPrice), 0)
    infoOrder.totalAmount = totalAmount;
    
    const newOrder = await Order.create(infoOrder);

    if (!newOrder) {
        return {
            errorCode: ERROR_CODES.ORDER.ERROR_CREATE,
            messages: ERROR_MESSAGES.ORDER[ERROR_CODES.ORDER.ERROR_CREATE]
        }
    }
    
    for (const product of products) {
        const device = await Device.findOne({ where: { idDevice: product.idDevice } });

        const detail_order = await OrderDetail.create({
            id: newOrder.id,
            idDevice: product.idDevice,
            price: product.sellingPrice,
            stock: product.quantity,
            amount: product.sellingPrice * product.quantity,
            status: 1,
        });

        await Warehouse.update(
            {
                stock: Sequelize.literal(`stock - ${product.quantity}`)
            },
            {
                where: {
                    idDevice: product.idDevice
                }
            }
        )
    }

    return {
        errorCode: ERROR_CODES.SUCCESS,
        message: ERROR_MESSAGES.ORDER[ERROR_CODES.SUCCESS]
    }
}

const cancelOrder = async (idOrder, status) => {
    try {
        const order = await Order.findByPk(idOrder);
        if (
            status == STATUS_CODES.ORDER.CANCELLED &&
            (order.status === STATUS_CODES.ORDER.PENDING || order.status === STATUS_CODES.ORDER.PREPARING)
        ) {
            const [affectedCount, affectedRows] = await Order.update(
                { status: status },
                { where: { id: idOrder }, returning: true }
            );
            console.log("affectedCount:", affectedCount,
                "affectedRows:", affectedRows)
            return {
                errorCode: ERROR_CODES.SUCCESS,
                affectedCount: affectedCount,
                affectedRows: affectedRows
            }
        }

        return {
            errorCode: ERROR_CODES.ORDER.CANNOT_CANCEL,
            messages: ERROR_MESSAGES.ORDER[ERROR_CODES.ORDER.CANNOT_CANCEL]
        }
    } catch (error) {
        console.log("đây lại")
        return {
            errorCode: ERROR_CODES.ORDER.INTERNAL_ERROR,
            messages: error.message || ERROR_MESSAGES.ORDER[ERROR_CODES.ORDER.CANNOT_CANCEL]
        }
    }
}

const cancelOrderAdmin = async (idOrder, status) => {
    try {
        const order = await Order.findByPk(idOrder);
        if (
            status == STATUS_CODES.ORDER.CANCELLED &&
            (order.status === STATUS_CODES.ORDER.PENDING || order.status === STATUS_CODES.ORDER.PREPARING || order.status === STATUS_CODES.ORDER.DELIVERING)
        ) {
            const [affectedCount, affectedRows] = await Order.update(
                { status: status },
                { where: { id: idOrder }, returning: true }
            );
            console.log("affectedCount:", affectedCount,
                "affectedRows:", affectedRows)
            return {
                errorCode: ERROR_CODES.SUCCESS,
                affectedCount: affectedCount,
                affectedRows: affectedRows
            }
        }

        return {
            errorCode: ERROR_CODES.ORDER.CANNOT_CANCEL,
            messages: ERROR_MESSAGES.ORDER[ERROR_CODES.ORDER.CANNOT_CANCEL]
        }
    } catch (error) {
        console.log("đây nè")
        return {
            errorCode: ERROR_CODES.ORDER.INTERNAL_ERROR,
            messages: error.message || ERROR_MESSAGES.ORDER[ERROR_CODES.ORDER.CANNOT_CANCEL]
        }
    }
}

const updateOrder = async (data) => {
    try {
        const [affectedCount, affectedRows] = await Order.update(data,
            {
                where: { id: data.id}
            }
        );

        if (data.status == 2) {
            data.order_device.forEach(async (item) => {
                
                const quantityInWarehouse = await Warehouse.findOne({
                    where: {
                        idDevice: item.device.idDevice
                    },
                    attributes: ['stock']
                })

                const quantityDeviceBuy = item.stock
                await Warehouse.update( {stock: quantityInWarehouse.stock - quantityDeviceBuy} , {
                    where: { idDevice : item.device.idDevice }
                })
            });
        }

        return {
            errorCode: ERROR_CODES.SUCCESS,
            affectedCount: affectedCount,
            affectedRows: affectedRows
        }
    }catch (error) {
        return {
            errorCode: ERROR_CODES.ORDER.INTERNAL_ERROR,
            messages: error.message || ERROR_MESSAGES.ORDER[ERROR_CODES.ORDER.ERROR_UPDATE]
        }
    }
}

module.exports = {
    getAllOrderByIdCustomer,
    checkCustomerOrderForDevice,
    getAllOrder,
    getByIdOrder,
    createOrder, updateOrder,
    cancelOrderAdmin,
    cancelOrder,
    getAllOrder_RevenueStatistics
}