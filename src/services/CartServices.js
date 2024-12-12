const { Op } = require('sequelize');
const Cart = require('../models/Cart');

const getAllInCart = async () => {
    return await Cart.findAll();
}
const getCartIdCustomer = async (id) => {
    return await Cart.findByPk(id)
}
const postAddDeviceToCart = async (data) => {
    return await Cart.create(data);
}

const putUpdateDeviceInCart = async (id, data) => {
    const result = await Cart.findByPk(id);
    return await result.update(data);
}

const removeDeviceInCartAPI = async (idCustomer, idDevice) => {
    const cartItem = await Cart.findOne({
        where: { idCustomer, idDevice }
    });

    if (cartItem) {
        await cartItem.destroy();
        return { message: 'Xóa thiết bị khỏi giỏ hàng thành công!' };
    } else {
        return { message: 'Thiết bị không có trong giỏ hàng!' };
    }
}

const removeAllDeviceInCartAPI = async (idCustomer) => {
    const result = await Cart.destroy({
        where: { idCustomer }
    });

    if (result > 0) {
        return { message: 'Xóa tất cả thiết bị khỏi giỏ hàng thành công!' };
    } else {
        return { message: 'Giỏ hàng trống!' };
    }
}

module.exports = { getAllInCart, getCartIdCustomer, postAddDeviceToCart, putUpdateDeviceInCart, removeDeviceInCartAPI, removeAllDeviceInCartAPI };
