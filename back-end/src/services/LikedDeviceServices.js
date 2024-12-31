const connection = require('../config/database');
const Likeds = require('../models/Liked');
const Sequelize = require('../config/database');
const { where } = require('sequelize');

// Lấy tất cả sản phẩm yêu thích
const getAllLikedDevices = async(data) => {
    const idCustomer = data.idCustomer;
    return await Likeds.findAll({
        where: { idCustomer: idCustomer },
        attributes: ['idDevice'],
    });
}

// Thêm một sản phẩm yêu thích
const createLikedDevice = async (data) => {
    //Kiểm tra xem sản phẩm này đã có trong sản phẩm yêu thích của khách hàng chưa
    const exists = await Likeds.findOne({
        where: {
            idCustomer: data.idCustomer,
            idDevice: data.idDevice
        }
    });

    if (exists) {
        return false;
    }
    return Likeds.create(data);
};

// Xóa một sản phẩm yêu thích
const removeLikedDevice = async (data) => {
    const exists = await Likeds.findOne({
        where: {
            idCustomer: data.idCustomer,
            idDevice: data.idDevice
        }
    });

    if (!exists) {
        return false;
    }
    return await Likeds.destroy({
        where: {
            idCustomer: data.idCustomer,
            idDevice: data.idDevice
        }
    });
}

// Xóa tất cả sản phẩm yêu thích
const removeAllLikedDevice = async (data) => {
    const idCustomer = data.idCustomer;
    return await Likeds.destroy({
        where: {
            idCustomer: idCustomer
        }
    });
}

module.exports = {
    getAllLikedDevices,
    createLikedDevice,
    removeLikedDevice,
    removeAllLikedDevice,
};