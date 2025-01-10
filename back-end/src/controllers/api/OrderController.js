const connection = require('../../config/database.js');
const Order = require('../../models/Order.js');

const { checkCustomerOrderForDevice } = require('../../services/OrdersServices.js');

const getAllOrderAPI = async (req, res) => {
    //TO DO SOMETHING
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
    checkCustomerOrderForDeviceAPI
}