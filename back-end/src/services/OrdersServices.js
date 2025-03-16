const { where, Model } = require('sequelize');
const { Op, Sequelize } = require('sequelize');
const Order = require('../models/Order');
const Employee = require('../models/Employee');
const Customer = require('../models/Customer');
const Device = require('../models/Device');
const { checkDevice, getCheckNameDevice } = require('./DeviceServices');
const { ERROR_CODES, ERROR_MESSAGES } = require('../docs/contants');
const OrderDetail = require('../models/Order_detail');
const { STATUS_CODES } = require('../../../statusContaints');
const Warehouse = require('../models/Warehouse');
const { default: get_error_response } = require('../helpers/response');
const { isExistId, validate_number } = require('../helpers/validate');
const { remove_zero } = require('../helpers/array');
const { format_date } = require('../helpers/date');
const sequelize = require('../config/database');

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

const createOrder = async (order) => {
    const transaction = await sequelize.transaction();
    try {
        if (!await isExistId(id = order.customer_id, model = Customer)) return get_error_response(errorCode = ERROR_CODES.CUSTOMER.NOT_FOUND)
            if (order.saler_id != null) {
                if (!await isExistId(id=order.saler_id, model = Customer)) return get_error_response(errorCode=ERROR_CODES.CUSTOMER.NOT_FOUND)
                }
            
        const devicesChanged = await checkListProduct(order.list_products);
        
        if (devicesChanged.length > 0) {
            const data = {
                message: "Thiết bị trong đơn hàng có thay đổi!",
                devicesChanged,
            }
            return get_error_response(error_code = ERROR_CODES.ORDER.INFO_DEVICES_IS_CHANGED, status_code = 406);
        }
    
        let errors = [
            validate_number(number = order.total_import_money) ? ERROR_CODES.ORDER.TOTAL_IMPORT_NOT_NUMBER : 0,
            validate_number(number = order.total_money) ? ERROR_CODES.ORDER.TOTAL_MONEY_NOT_NUMBER : 0,
            validate_number(number = order.amount) ? ERROR_CODES.ORDER.AMOUNT_NOT_NUMBER : 0,
            validate_number(number = order.prepaid) ? ERROR_CODES.ORDER.PREPAID_NOT_NUMBER : 0,
            validate_number(number = order.discount, end = 100) ? ERROR_CODES.ORDER.DISCOUNT_NOT_NUMBER : 0,
            validate_number(number = order.vat, end = 100) ? ERROR_CODES.ORDER.VAT_NOT_NUMBER : 0,
        ]
        
        errors = remove_zero(errors)
    
        if (errors.length() > 0) return get_error_response(errors, status_code = 406)
        
        const newOrder = await Order.create(...infoOrder, {transaction});
    
        if (!newOrder) {
            return get_error_response(ERROR_CODES.ORDER.CREATE_FAILED, status_code = 406)
        }
        
        for (const product of products) {
            const device = await Device.findOne({ where: { idDevice: product.idDevice } });
    
            const detail_order = await OrderDetail.create({
                id: newOrder.id,
                idDevice: product.idDevice,
                nameDevice: device.name,
                price: product.sellingPrice,
                stock: product.quantity,
                amount: product.sellingPrice * product.quantity,
                status: 1,
            });
        }
    
        await transaction.commit();
        return get_error_response(ERROR_CODES.ORDER.SUCCESS)
    } catch (error) {
        await transaction.rollback();
        return get_error_response(ERROR_CODES.ORDER.CREATE_FAILED, status_code = 406);
    }
    
}

const add_detail_order = async (detail_order) => {
    const { sku, unit, import_price, sale_price, discount, quantity_sold, amount, delivery_date, receiving_date, is_gift } = detail_order

    if (detail_order) {
        

        if (is_gift) {
                sale_price = 0
                discount = 0
        }

        amount_caculator = sale_price * quantity_sold * (1 - discount / 100)
        if (amount !== amount_caculator) {
            return get_error_response(ERROR_CODES.DETAIL_ORDER.AMOUNT_NOT_SAME)
        }
        return {"amount_caculator": amount_caculator}
    }

    return false
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

// NCC-SP-YYYYMMDD-XXX
// XXX: Lần nhập hàng thứ mấy của sản phẩm đó trong ngày
async function create_sku(supplier_id, device_id, import_date) {
    let format_date = format_date(import_date)

    query = `
        SELECT import_number
        FROM import_warehouse
        WHERE DATE(import_date) = :import_date
        ORDER BY import_number DESC
        LIMIT 1
        FOR UPDATE
    `

    const [data] = await sequelize.query(query,
        {
            replacements: { import_date: import_date },
            type: Sequelize.QueryTypes.SELECT
        }
    );

    const counter_in_import_date = data.import_number
    
    return `${supplier_id}-${device_id}-${format_date}-${counter_in_import_date}`
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