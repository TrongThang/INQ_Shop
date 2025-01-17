const InfoWebsite = require('../models/Info_website');
const Sequelize = require('../config/database');
const { where } = require('sequelize');

// Lấy tất cả thông tin website
const getAllInfoWebsite = async() => {
    const data = await InfoWebsite.findAll();
    const settings = data.reduce((acc, item) => {
        if (item.STATUS >= 0) {
            acc[item.KEY_NAME] = item.VALUE;    
            return acc;
        }   
    }, {});

    return settings;
}

const getAllInfoWebsite_Admin = async() => {
    const data = await InfoWebsite.findAll();


    return data;
}


// Lấy thông tin website dựa trên KEY_NAME
const getInfoByKeyName = async (keyName) => {
    try {
        const info = await InfoWebsite.findOne({
            where: { KEY_NAME: keyName }
        });

        if (!info) {
            return null; // Trả về null nếu không tìm thấy bản ghi
        }

        return info; // Trả về thông tin tìm được
    } catch (error) {
        console.error("Error fetching info by KEY_NAME:", error);
        throw error; // Ném lỗi để xử lý ở tầng cao hơn
    }
};

// Thêm một thông tin website
const createInfoWebsite = async (data) => {
    data.KEY_NAME = data.KEY_NAME.toUpperCase();
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
    getInfoByKeyName,
    getAllInfoWebsite_Admin
};