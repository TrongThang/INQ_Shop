const connection = require('../../config/database');
const Cart = require('../../models/Cart');

const {
    getCartInCookie, saveCartInCookie, 
    addToCartInCookie, updateQuantityDeviceInCartCookie,
    removeDeviceCartInCookie
} = require('../../services/CartServices');

const getCartInCookieAPI = (req, res) => {
    try {
        const cartData = getCartInCookie(req);

        return res.status(200).json({
            errorCode: 0,
            data: (cartData !== undefined ? cartData : "Vui lòng thêm sản phẩm vào giỏ hàng!"),
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình fetch dữ liệu của Giỏ hàng',
            details: error.message,
        });
    }
}

const addToCartAPI = async (req, res) => {
    try {
        const deviceAdd = req.body;
        const newCart = addToCartInCookie(req.cookies.cart, deviceAdd);

        saveCartInCookie(res, newCart);

        return res.status(200).json({
            errorCode: 0,
            data: newCart
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình thêm Thiết bị mới vào Giỏ hàng',
            details: error.message,
        });
    }
}

const updateQuantityDeviceInCartAPI = async (req, res) => {
    try {
        const {idDevice, quantity}= req.body;
        const newCart = updateQuantityDeviceInCartCookie(req.cookies.cart, idDevice, quantity);

        saveCartInCookie(res, newCart);

        return res.status(200).json({
            errorCode: 0,
            data: newCart
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình thêm Thiết bị mới vào Giỏ hàng',
            details: error.message,
        });
    }
}

const removeDeviceInCartAPI = async (req, res) => {
    try {
        const {idRemove}= req.body;
        const newCart = removeDeviceCartInCookie(req.cookies.cart, idRemove);

        saveCartInCookie(res, newCart);

        return res.status(200).json({
            errorCode: 0,
            data: newCart
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình thêm Thiết bị mới vào Giỏ hàng',
            details: error.message,
        });
    }
}
    
const removeAllDeviceInCartAPI = async (req, res) => {
    try {
        res.clearCookie('cart');
        return res.status(200).json({
            errorCode: 0,
            msg: 'Giỏ hàng đã được xóa thành công',
        });
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            msg: 'Có lỗi xảy ra trong quá trình xóa Giỏ hàng',
            details: error.message,
        });
    }
}

module.exports = {
    getCartInCookieAPI, addToCartAPI, 
    updateQuantityDeviceInCartAPI, removeDeviceInCartAPI,
    removeAllDeviceInCartAPI
}