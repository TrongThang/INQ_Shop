const { Op } = require('sequelize');
const Cart = require('../models/Cart');

function convertToArray(input) {
    if (Array.isArray(input)) {
        return input;
    }
    try {
        const parsed = JSON.parse(input);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        throw new Error("Dữ liệu không phải là mảng sau khi parse");
    } catch (error) {
        console.error("Lỗi khi chuyển đổi input thành mảng:", error);
        return [];
    }
}

const getCartInCookie = (req) => {
    const cart = req.cookies.cart;

    return cart ? JSON.parse(cart) : [];
}

const saveCartInCookie = (res, cart) => {
    res.cookie('cart', JSON.stringify(cart), {
        httpOnly: true, // Cookie sẽ không thể chỉnh sửa từ phía Client
        maxAge: 4 * 7 * 24 * 60 * 60 * 1000, // Thời gian sống là 1 tháng
    })
}

const addToCartInCookie = (cart, deviceAdd) => {
    const { idDevice, name, sellingPrice, quantity } = deviceAdd;

    let newCart = convertToArray(cart);

    console.log(newCart)
    //Kiểm tra sản phẩm có trong cookie hay không
    const existingProduct = newCart.find(item => item.idDevice === idDevice);

    if (existingProduct) {
        existingProduct.quantity = Number(existingProduct.quantity) + Number(quantity);
    } else {
        newCart.push({ idDevice, name, sellingPrice, quantity });
        console.log(`Đã thêm sản phẩm mới có idDevice = ${idDevice}`);
    }

    return newCart
}

const updateQuantityDeviceInCartCookie = (cart, idDevice, quantity) => {
    let newCart = convertToArray(cart);

    let device = newCart.find(item => item.idDevice === idDevice);

    if (device) {
        device.quantity = Number(quantity);
    }

    return newCart;
}

const removeDeviceCartInCookie = (cart, idRemove) => {
    const cartArr = convertToArray(cart);

    const newCart = cartArr.filter((item) => item.idDevice !== idRemove);

    return newCart;
}

const getAllInCart = async () => {
    return await Cart.findAll();
}

const getCartIdCustomer = async (data) => {
    const { idCustomer, idDevice } = data;
    return await Cart.findOne({
        where: {
            idCustomer: idCustomer,
            idDevice: idDevice,
        },
    })
}


const postAddDeviceToCart = async (data) => {
    return await Cart.create(data);
}

const putUpdateDeviceInCart = async (data) => {
    const {idCustomer,idDevice} = data

    const result = await Cart.findOne({
        where: {
            idCustomer: idCustomer,
            idDevice: idDevice,
        },
    })
    return await result.update(data);
}

const removeDeviceInCart = async (data) => {
    const { idCustomer, idDevice } = data;  // Lấy idCustomer và idDevice từ dữ liệu

    // Tìm một mục giỏ hàng duy nhất thỏa mãn cả điều kiện idCustomer và idDevice
    const cartItem = await Cart.findOne({
        where: { 
            idCustomer: idCustomer,   // Điều kiện idCustomer
            idDevice: idDevice,       // Điều kiện idDevice
        },
    });

    console.log(cartItem);  // In ra mục giỏ hàng tìm thấy

    // Kiểm tra nếu có mục giỏ hàng thỏa mãn
    if (cartItem) {
        // Nếu có, thực hiện xóa
        await cartItem.destroy();  // Xóa mục giỏ hàng tìm được
        return { message: 'Xóa thiết bị khỏi giỏ hàng thành công!' };
    } else {
        // Nếu không tìm thấy mục giỏ hàng thỏa mãn
        return { message: 'Thiết bị không có trong giỏ hàng!' };
    }
};

const removeAllDeviceInCart = async (data) => {
    const idCustomer = data.idCustomer
    const result = await Cart.destroy({
        where: { 
            idCustomer: idCustomer,
         }
    });

    if (result > 0) {
        return { message: 'Xóa tất cả thiết bị khỏi giỏ hàng thành công!' };
    } else {
        return { message: 'Giỏ hàng trống!' };
    }
}
module.exports = {
    getCartInCookie, saveCartInCookie,
    addToCartInCookie, updateQuantityDeviceInCartCookie,
    removeDeviceCartInCookie,
    // DATABASE
    getAllInCart, getCartIdCustomer,
    postAddDeviceToCart, putUpdateDeviceInCart,
    removeDeviceInCart, removeAllDeviceInCart,

}
