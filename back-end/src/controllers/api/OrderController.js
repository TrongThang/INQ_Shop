const connection = require('../../config/database.js');
const Order = require('../../models/Order.js');
const { or } = require('sequelize');

const {
    checkCustomerOrderForDevice, getAllOrderByIdCustomer,
    getAllOrder, getAllOrder_RevenueStatistics,
    getByIdOrder,
    createOrder, updateOrder,
    cancelOrderAdmin,
    cancelOrder,
} = require('../../services/OrdersServices.js');
const { ERROR_CODES } = require('../../docs/contants.js');
const { STATUS_CODES } = require('../../docs/status_contants.js');

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

const postCreateOrderAPI = async (req, res) => {
    const { infoOrder, products } = req.body;
    //Mã KH
    const result = await createOrder(infoOrder, products);
    
    return res.status(result.errorCode === ERROR_CODES.SUCCESS ? 200 : 401).json(result)
}

const putUpdateOrderAPI = async (req, res) => {
    const data = req.body;
    
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
    checkCustomerOrderForDeviceAPI, getAllOrder_RevenueStatisticsAPI,
    getAllOrderByIdCustomerAPI,
    getAllOrderAPI,
    getOrderByIdOrderAPI,
    postCreateOrderAPI, putUpdateStatusOrderAPI,
    putUpdateStatusOrderAdminAPI,
    putUpdateOrderAPI
}