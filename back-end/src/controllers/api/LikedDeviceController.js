const connection = require('../../config/database');
const Liked = require('../../models/Liked');

const {
    getAllLikedDevices,
    getLikedDevices,
    createLikedDevice,
    removeLikedDevice,
    removeAllLikedDevice,
 } = require('../../services/LikedDeviceServices');

const getAllLikedDeviceAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const { idCustomer } = req.params;
        const allLikedDevices = await getAllLikedDevices(idCustomer);
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

const getLikedDeviceAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const LikedDevices = await getLikedDevices(req.params);
        res.status(200).json({
            success: true,
            data: LikedDevices
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
        const likedDevice = await createLikedDevice(data);
        if(!likedDevice){
            return res.status(400).json({
                success: false,
                message: "Sản phẩm này đã được yêu thích."
            });
        }
        res.status(200).json({
            success: true,
            data: likedDevice
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
        const likedDevice = await removeLikedDevice(req.params);
        if(!likedDevice){
            return res.status(404).json({
                success: false,
                message: "Sản phẩm yêu thích không tồn tại."
            });
        }
        res.status(200).json({
            success: true,
            data: likedDevice,
            message: 'Xóa sản phẩm yêu thích thành công',
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi xóa sản phẩm yêu thích',
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
        const { data } = req.params;
        if (data.idDevice) {
            // Xóa một sản phẩm yêu thích
            removeLikedDeviceAPI(idDevice)
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
    getLikedDeviceAPI,
    postAddToLikedDeviceAPI,
    removeLikedDeviceAPI,
    removeAllLikedDeviceAPI,
}