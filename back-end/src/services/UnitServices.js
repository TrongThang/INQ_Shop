const DonViTinh = require('../models/Unit');
const { Op } = require('sequelize');
const { getErrorResponse } = require('../helpers/response');
const { ERROR_CODES } = require('../docs/contants');

const getDonViTinh = async (filter, limit, page, order, sort) => {
    const options = {
        where: filter,
        limit: limit,
        offset: (page - 1) * limit,
        order: [[sort, order]],
    };

    const response = await DonViTinh.findAll(options);
    return getErrorResponse(ERROR_CODES.SUCCESS, null, response);
};

const postDonViTinh = async (ten) => {
    const existing = await DonViTinh.findOne({ where: { ten } });
    if (existing) {
        return getErrorResponse(ERROR_CODES.DUPLICATE_NAME, 'Tên đã tồn tại');
    }

    const newDVT = await DonViTinh.create({ ten });
    return getErrorResponse(ERROR_CODES.SUCCESS, null, newDVT.toJSON());
};

const putDonViTinh = async (id, name) => {
    const existing = await DonViTinh.findOne({ where: { ten: name, id: { [Op.ne]: id } } });
    if (existing) {
        return getErrorResponse(ERROR_CODES.DUPLICATE_NAME, 'Tên đã tồn tại');
    }

    const donViTinh = await DonViTinh.findByPk(id);
    if (!donViTinh) {
        return getErrorResponse(ERROR_CODES.DVT_NOT_FOUND, 'Không tìm thấy đơn vị tính');
    }

    donViTinh.ten = name;
    await donViTinh.save();
    return getErrorResponse(ERROR_CODES.SUCCESS, null, donViTinh.toJSON());
};

const deleteDonViTinh = async (id) => {
    const donViTinh = await DonViTinh.findByPk(id);
    if (!donViTinh) {
        return getErrorResponse(ERROR_CODES.DVT_NOT_FOUND, 'Không tìm thấy đơn vị tính');
    }

    await donViTinh.destroy();
    return getErrorResponse(ERROR_CODES.SUCCESS);
};

module.exports = {
    getDonViTinh,
    postDonViTinh,
    putDonViTinh,
    deleteDonViTinh,
};