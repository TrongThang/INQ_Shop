const InfoWebsite = require('../models/Info_website');
const Sequelize = require('../config/database');
const { where } = require('sequelize');

// Lấy tất cả thông tin website
const getAllInfoWebsite = async() => {
    return await InfoWebsite.findAll();
}

// Thêm một thông tin website
const createInfoWebsite = async (data) => {
    return await InfoWebsite.create(data);
};

// Cập nhật thông tin website
const updateInfoWebsite = async (data) => {
    const exists = await InfoWebsite.update(
        {
            VALUE: data.VALUE,
            ID_PAGE: data.ID_PAGE,
            STATUS: data.STATUS,
        },
        {
            where: { KEY_NAME: data.KEY_NAME },
        }
    );

    if (!exists) {
        return false;
    }
    return true;
}

// Cập nhật trạng thái thông tin website
const updateStatusInfoWebsite = async (data) => {
    const exists = await InfoWebsite.update(
        {
            STATUS: data.STATUS,
        },
        {
            where: { KEY_NAME: data.KEY_NAME },
        }
    );

    if (!exists) {
        return false;
    }
    return true;
}

module.exports = {
    getAllInfoWebsite,
    createInfoWebsite,
    updateInfoWebsite,
    updateStatusInfoWebsite,
};