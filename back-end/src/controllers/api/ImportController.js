const connection = require('../../config/database.js');
const Warehouse = require('../../models/Warehouse.js');

const getAllOrderAPI = async (req, res) => {
    //TO DO SOMETHING
}

const getAllStockByDeviceAPI = async (req, res) => {
    try {
        const data = await Warehouse.findAll();

        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({message: "Lỗi lấy thông tin về thiết bị tồn kho", detail: error.message})
    }
};

    
module.exports = {
    getAllStockByDeviceAPI
}