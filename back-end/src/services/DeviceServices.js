const connection = require('../config/database');
const { Op, Sequelize } = require('sequelize');
const { convertToSlug } = require('../helpers/stringHelper');
const Category = require('../models/Category');
const Device = require('../models/Device');
// const { Device, ReviewDevice } = require('../models/Init-models');
const ReviewDevice = require('../models/Review_device');

<<<<<<< HEAD
const getAllDevice_User = async (page = 0, filter = {}) => {
=======
// 0: Sản phẩm ngừng bán
// >= 1: Sản phẩm đang bán
// 1: Sản phẩm bán
// 2: Sản phẩm khuyến mãi
// 3: Sản phẩm nổi bật
// 4: Sản phẩm mới
// Nếu không nhập limit thì mặc định là lấy hết

const getAllDevice_User = async (page = 0, status = 1, limit = {},filters = {}) => {
>>>>>>> 5325c7d5e06d8506399c463e3eb00a53859f2c24
    const { priceMin, priceMax, idCategory, keyword } = filters;

    const whereConditions = {
        status: {
            [Op.gte]: status
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

    const offset = page * limit;

    const data = await Device.findAll({
        where: whereConditions,
        limit: limit,
<<<<<<< HEAD
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
=======
        offset: offset,
        include: [
            {
                model: ReviewDevice,
                as: 'reviews',
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']
                ],
                required: false
            }
        ],
        group: ['Device.idDevice'],
>>>>>>> 5325c7d5e06d8506399c463e3eb00a53859f2c24
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

const updateStatusDevice = async ({ id, status}) => {
    const valueIsHide = status <= 0 ? true : false;

    const [updatedCount] = await Device.update(
        {
            status: status,
            isHide: valueIsHide
        }, 
        { where: { id } }
    );

    return updatedCount;
}

<<<<<<< HEAD
const getAllReviewForDevice = async (id) => {
=======
const updateStatusDeviceByCategory = async ({ idCategory, status }) => {
    //Nếu như trạng thái > 0 thì isHide phải bằng false
    // Để chỉ bật những thiết bị đã bị tắt gián tiếp thôi
    const whereCondition = { idCategory: idCategory };

    if (status > 0) {
        whereCondition.isHide = false;
    }

    const [updateCount] = await Device.update(
        {
            status: status
        }, 
        {
            where: whereCondition
        }
    )

    return updateCount
}

const getAllReviewForDevice = async (id, status = {}) => {
>>>>>>> 5325c7d5e06d8506399c463e3eb00a53859f2c24
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

const updateStatusReviewForDevice = async ({ id, status }) => {
    //Nếu status <== 0 &&
    //Is Hide = True
    //Condition for isHide is False => Status >== 0
    const valueIsHide = status === 0 ? true : false;

    const [updatedCount] = await ReviewDevice.update(
        {
            status: status,
            isHide: valueIsHide
        }, 
        { where: { idDevice: id } }
    );

    return updatedCount;
}

module.exports = {
<<<<<<< HEAD
    getAllDevice_User, getAllDevice_Admin, getDeviceById,
    getOutstandingDevice, getDiscountDevice,
    createDevice, updateDevice, updateStatusDevice,
=======
    getAllDevice_User, getAllDevice_Admin,
    getDeviceById, getTOPDeviceLiked,
    createDevice, updateDevice, updateStatusDevice,
    updateStatusDeviceByCategory,

>>>>>>> 5325c7d5e06d8506399c463e3eb00a53859f2c24
    //Review For Device
    getAllReviewForDevice, createReviewForDevice,
    updateReviewForDevice, updateStatusReviewForDevice
}