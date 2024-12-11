const connection = require('../config/database');
const { convertToSlug } = require('../helpers/stringHelper');
const Category = require('../models/Category');
const Device = require('../models/Device');
const ReviewDevice = require('../models/Review_device');

const getAllDevice_User = async (page = 0, filter = {}) => {
    const { priceMin, priceMax, idCategory, keyword } = filters;

    const whereConditions = {
        status: {
            [Op.gte]: 1
        }
    };

    if (priceMin != undefined || priceMax != undefined) {
        whereConditions.price = {};
        if (priceMin != undefined) {
            whereConditions.sellingPrice[Op.gte] = priceMin;
        }
        if (priceMax != undefined) {
            whereConditions.sellingPrice[Op.lte] = priceMax;
        }
    }

    if (idCategory) {
        whereConditions.idCategory = idCategory;
    }

    if (keyword) {
        whereConditions.name = { [Op.like]: `%${keyword}%`}
    }

    const limit = 10;
    const offset = page * limit;

    const data = await Device.findAll({
        where: whereConditions,
        limit: limit,
        offset: offset
    });

    return await data;
}

//4: Sản phẩm nổi bật
const getOutstandingDevice = async () => {
    const data = await Device.findAll({
        where: { status:3 },
        limit: 10
    });

    return await data;
}

//3: Sản phẩm khuyến mãi - Giá giảm 5%
const getDiscountDevice = async () => {
    const data = await Device.findAll({
        where: { status: 3 },
        limit: 5
    });

    return await data;
}

const getTOPDeviceLiked = async () => {
    const data = await Device.findAll({
        where: {
            status: {
            [Op.gte]: 1 //gte:  >= 
            }
        },
        order: [['likePoint', 'DESC']],
        limit: 5
    });

    return await data;
}

const getAllDevice_Admin = async () => {
    const data = await Device.findAll();

    return await data;
}

const getDeviceById = async (id) => {
    return await Device.findByPK(id, {
        include: [
            {
                model: Category,
                as: 'categoryDevice'
            }
        ],
    });
}

const createDevice = async ( body ) => {
    const slug = convertToSlug(body.name);
    body.slug = slug;

    const deviceCreate = await Device.create(body);

    return deviceCreate;
}

const updateDevice = async (body) => {
    const [updatedCount] = await Device.update(body, {
        where: { id }
    });

    return updatedCount;
}

const updateStatusDevice = async ({id, status}) => {
    const [updatedCount] = await Device.update(
        { status: status }, 
        { where: { id } }
    );

    return updatedCount;
}

const getAllReviewForDevice = async (id) => {
    const comments = await ReviewDevice.findAll({
        where: {
            idDevice: id,
        }
    });

    return comments;
}

const createReviewForDevice = async ( body ) => {
    const reviewForDevice = await ReviewDevice.create({ body });
    
    return reviewForDevice;
}

const updateReviewForDevice = async ({ id, ...body }) => {
    const [updatedCount] = await ReviewDevice.update(body, {
        where: { id }
    });

    return updatedCount;
}

const updateStatusReviewForDevice = async ({id, status}) => {
    const [updatedCount] = await ReviewDevice.update(
        { status: status }, 
        { where: { id } }
    );

    return updatedCount;
}

module.exports = {
    getAllDevice_User, getAllDevice_Admin, getDeviceById,
    getOutstandingDevice, getDiscountDevice,
    createDevice, updateDevice, updateStatusDevice,
    //Review For Device
    getAllReviewForDevice, createReviewForDevice,
    updateReviewForDevice, updateStatusReviewForDevice
}