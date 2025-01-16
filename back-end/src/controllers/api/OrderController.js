const connection = require('../../config/database.js');
const Order = require('../../models/Order.js');
const { or } = require('sequelize');

const {
    checkCustomerOrderForDevice, getAllOrderByIdCustomer,
    getAllOrder,
    getByIdOrder,
    createOrder, updateOrder,
    cancelOrderAdmin,
    cancelOrder,
} = require('../../services/OrdersServices.js');
const { ERROR_CODES } = require('../../../../contants.js');
const { STATUS_CODES } = require('../../../../statusContaints.js');

const getAllOrderAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const orders = await getAllOrder();
        res.status(200).json({
            success: true,
            data: orders
        });
    }
    catch(error){
        return res.status(500).json({ 
            message: 'Đã xảy ra lỗi khi xử lý yêu cầu:',
            error: error.message });
    }
}

const getAllOrderByIdCustomerAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const orders = await getAllOrderByIdCustomer(req.params.id);
        res.status(200).json({
            success: true,
            data: orders
        });
    }
    catch(error){
        return res.status(500).json({ 
            message: 'Đã xảy ra lỗi khi xử lý yêu cầu:',
            error: error.message });
    }
}

const getOrderByIdOrderAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const orders = await getByIdOrder(req.params.idOrder);
        res.status(200).json({
            success: true,
            data: orders
        });
    }
    catch(error){
        return res.status(500).json({ 
            message: 'Đã xảy ra lỗi khi xử lý yêu cầu:',
            error: error.message });
    }
}

const checkCustomerOrderForDeviceAPI = async (req, res) => {
    try {
        const { idCustomer, idDevice } = req.params;
        const isOrder = await checkCustomerOrderForDevice(idCustomer, idDevice);
        console.log('Kết quả:', isOrder)
        return res.status(200).json(isOrder);

    } catch (error) {
        res.status(500).json({ detail: error.message })
    }
}

const postCreateOrderAPI = async (req, res) => {
    const { infoOrder, products } = req.body;
    //Mã KH
    const result = await createOrder(infoOrder, products);
    
    return res.status(result.errorCode === ERROR_CODES.SUCCESS ? 200 : 401).json(result)
}

const putUpdateOrderAPI = async (req, res) => {
    //TO DO SOMETHING
    const data = req.body;
    console.log(data)
    const result = await updateOrder(data);

    return res.status(result.errorCode === ERROR_CODES.SUCCESS ? 200 : 401).json(result)
}


const putUpdateStatusOrderAPI = async (req, res) => {
    const { idOrder, status } = req.body;
    var result = null;
    result = await cancelOrder(idOrder, status);

    return res.status(result.errorCode === ERROR_CODES.SUCCESS ? 200 : 401).json(result)
}

const putUpdateStatusOrderAdminAPI = async (req, res) => {
    const { idOrder, status } = req.body;
    var result = null;
    console.log("hello");
    result = await cancelOrderAdmin(idOrder, status);

    return res.status(result.errorCode === ERROR_CODES.SUCCESS ? 200 : 401).json(result)
}
    
const deleteCancelOrderAPI = async (req, res) => {
    const { idOrder } = req.body;

} 
module.exports = {
    checkCustomerOrderForDeviceAPI,
    getAllOrderByIdCustomerAPI,
    getAllOrderAPI,
    getOrderByIdOrderAPI,
    postCreateOrderAPI, putUpdateStatusOrderAPI,
    putUpdateStatusOrderAdminAPI,
    putUpdateOrderAPI
}