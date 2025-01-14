const connection = require('../../config/database.js');
const Order = require('../../models/Order.js');
const { or } = require('sequelize');

const {
    checkCustomerOrderForDevice,
    getAllOrderByIdCustomer,
    getAllOrder,
    getByIdOrder,
} = require('../../services/OrdersServices.js');

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

const getOrderAPI = async (req, res) => {
    //TO DO SOMETHING
};

const postCreateOrderAPI = async (req, res) => {
    //TO DO SOMETHING
}

const putUpdateOrderAPI = async (req, res) => {
    //TO DO SOMETHING
}

const deteleOrderAPI = async (req, res) => {
    //TO DO SOMETHING
}
    
module.exports = {
    checkCustomerOrderForDeviceAPI,
    getAllOrderByIdCustomerAPI,
    getAllOrderAPI,
    getOrderByIdOrderAPI,
}