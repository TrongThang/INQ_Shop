const connection = require('../../config/database');
const Cart = require('../../models/Cart');

const {
    getCartInCookie, saveCartInCookie, 
    addToCartInCookie, updateQuantityDeviceInCartCookie,
    removeDeviceCartInCookie,

    //Database
    getAllInCart, getCartIdCustomer,
    postAddDeviceToCart, putUpdateDeviceInCart,
    removeDeviceInCart, removeAllDeviceInCart
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

const postAddToCartCookieAPI = async (req, res) => {
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

const putUpdateQuantityDeviceInCartCookieAPI = async (req, res) => {
    try {
        const { idDevice, quantity } = req.body;
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

const removeDeviceInCartCookieAPI = async (req, res) => {
    try {
        const { idRemove } = req.body;
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
    };
}

const removeAllDeviceInCartCookieAPI = async (req, res) => {
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

// DATABASE
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
    getCartInCookieAPI, postAddToCartCookieAPI,
    putUpdateQuantityDeviceInCartCookieAPI,
    removeDeviceInCartCookieAPI, removeAllDeviceInCartCookieAPI,
    // DATABASE
    getAllInCartAPI, getCartAPI,
    postAddDeviceToCartAPI, putUpdateDeviceInCartAPI,
    removeDeviceInCartAPI, removeAllDeviceInCartAPI
};
