const { or } = require('sequelize');

const {
    getAllOrder,
} = require('../../services/OrdersServices');

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
    getAllOrderByIdCustomerAPI,
}