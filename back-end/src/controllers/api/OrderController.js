const connection = require('../../config/database.js');
const Order = require('../../models/Order.js');
const { or } = require('sequelize');

const {
    checkCustomerOrderForDevice,
    getAllOrder_RevenueStatistics,
    getAllOrder
} = require('../../services/OrdersServices.js');

const getAllOrderByIdCustomerAPI = async (req, res) => {
    //TO DO SOMETHING
    try {
        const orders = await getAllOrder(req.params.id);
        res.status(200).json({
            success: true,
            data: orders
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi xử lý yêu cầu:',
            error: error.message
        });
    }
}
//Thống kê - doanh thu theo trạng thái là hoàn thành, thống kế - theo lượt mua trạng thái là hoàn thành nhưng điếm số lượng đơn hoàn thành
const getAllOrder_RevenueStatisticsAPI = async (req, res) => {
    const status = 4;
    try {
        const orders = await getAllOrder_RevenueStatistics(status);
        res.status(200).json({
            success: "Thành công",
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi xử lý yêu cầu:',
            error: error.message
        });
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
    getAllOrder_RevenueStatisticsAPI,
}