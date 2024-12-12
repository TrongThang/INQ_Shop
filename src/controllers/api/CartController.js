const {
    getAllInCart, getCartIdCustomer, postAddDeviceToCart, putUpdateDeviceInCart, removeDeviceInCart, removeAllDeviceInCart
} = require('../../services/CartServices.js');

const getAllInCartAPI = async (req, res) => {
    try {
        const result = await getAllInCart(); 
        res.status(200).json({
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu giỏ hàng', error });
    }
}
const getCartAPI = async (req, res) => {
    const {idCustomer} = req.params
    try {
        const result = await getCartIdCustomer(idCustomer); 
        res.status(200).json({
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu giỏ hàng', error });
    }
}

const postAddDeviceToCartAPI = async (req, res) => {
    const data = req.body;
    try {
        const result = await postAddDeviceToCart(data);
        res.status(201).json({
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm thiết bị vào giỏ hàng', error });
    }
}

const putUpdateDeviceInCartAPI = async (req, res) => {
    const { idCustomer, idDevice } = req.params;
    const { stock } = req.body;
    try {
        const result = await putUpdateDeviceInCart(idCustomer, idDevice, { stock });
        res.status(200).json({
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật thiết bị trong giỏ hàng', error });
    }
}

const removeDeviceInCartAPI = async (req, res) => {
    const { idCustomer, idDevice } = req.params;
    try {
        const result = await removeDeviceInCart(idCustomer, idDevice);
        res.status(200).json({
            data: result
        });
    } catch (error) {   
        res.status(500).json({ message: 'Lỗi khi xóa thiết bị khỏi giỏ hàng', error });
    }
}

const removeAllDeviceInCartAPI = async (req, res) => {
    const { idCustomer } = req.params;
    try {
        const result = await removeAllDeviceInCart(idCustomer);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa tất cả thiết bị khỏi giỏ hàng', error });
    }
}

module.exports = {
    getAllInCartAPI,
    getCartAPI,
    postAddDeviceToCartAPI,
    putUpdateDeviceInCartAPI,
    removeDeviceInCartAPI,
    removeAllDeviceInCartAPI
};
