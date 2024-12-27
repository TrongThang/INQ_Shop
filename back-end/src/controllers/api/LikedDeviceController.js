const connection = require('../../config/database');
const Liked = require('../../models/Liked');

const { 
    getAllLikedDevices,
    createLikedDevice,
    removeLikedDevice,
    removeAllLikedDevice,
 } = require('../../services/LikedDeviceServices');

const getAllLikedDeviceAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const data = req.body;
        console.log(data);
        const allLikedDevices = await getAllLikedDevices(data);
        res.status(200).json({
            success: true,
            data: allLikedDevices
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi truy xuất sản phẩm yêu thích',
            error: error.message,
        });
    }
}

const postAddToLikedDeviceAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const data = req.body;
        const allLikedDevices = await createLikedDevice(data);
        res.status(200).json({
            success: true,
            data: allLikedDevices
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi thêm sản phẩm yêu thích',
            error: error.message,
        });
    }
}

const removeLikedDeviceAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const data = req.body;
        const allLikedDevices = await removeLikedDevice(data);
        res.status(200).json({
            success: true,
            data: allLikedDevices
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi thêm sản phẩm yêu thích',
            error: error.message,
        });
    }
}
    
const removeAllLikedDeviceAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const data = req.body;
        const allLikedDevices = await removeAllLikedDevice(data);
        res.status(200).json({
            success: true,
            data: allLikedDevices
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi thêm sản phẩm yêu thích',
            error: error.message,
        });
    }
}

const removeAllOrSingleLikedDeviceAPI = async (req, res) => {
    //TO DO SOMETHING
    try {
        const data = req.body;
        console.log(data);
        const idDevice = data.idDevice;
        if (idDevice) {
            // Xóa một sản phẩm yêu thích
            removeLikedDeviceAPI(req, res)
        } else {
            // Xóa tất cả sản phẩm yêu thích
            removeAllLikedDeviceAPI(req, res);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi xử lý yêu cầu.' });
    }
}


module.exports = {
    getAllLikedDeviceAPI,
    postAddToLikedDeviceAPI,
    removeAllOrSingleLikedDeviceAPI
}