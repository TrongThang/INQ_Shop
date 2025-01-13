const connection = require('../../config/database.js');
const Order = require('../../models/Order.js');
const { or } = require('sequelize');

const {
    checkCustomerOrderForDevice,
    getAllOrder,
    createOrder
} = require('../../services/OrdersServices.js');

const getAllOrderByIdCustomerAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const orders = await getAllOrder(req.params.id);
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
    const result = createOrder(infoOrder, products);
    
    return res.status(result.errorCode === ERROR_CODES.SUCCESS ? 200 : 401).json(result)
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
    postCreateOrderAPI,
}