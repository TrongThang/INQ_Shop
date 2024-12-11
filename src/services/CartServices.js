const Cart = require('../models/Cart');

function convertToArray(input) {
    if (Array.isArray(input)) {
        return input; // Nếu là mảng, trả về ngay
    }
    try {
        const parsed = JSON.parse(input); // Thử parse nếu là chuỗi JSON
        if (Array.isArray(parsed)) {
            return parsed; // Nếu parse thành công và là mảng, trả về
        }
        throw new Error("Dữ liệu không phải là mảng sau khi parse");
    } catch (error) {
        console.error("Lỗi khi chuyển đổi input thành mảng:", error);
        return []; // Nếu không thể parse, trả về mảng rỗng
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

    let newCart =  convertToArray(cart);

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

module.exports = {
    getCartInCookie, saveCartInCookie, 
    addToCartInCookie, updateQuantityDeviceInCartCookie,
    removeDeviceCartInCookie
}