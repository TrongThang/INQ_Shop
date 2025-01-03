const connection = require('../config/database');
const { Op, Sequelize } = require('sequelize');
const { convertToSlug } = require('../helpers/stringHelper');
const Category = require('../models/Category');
const Device = require('../models/Device');
// const { Device, ReviewDevice } = require('../models/Init-models');
const ReviewDevice = require('../models/Review_device');

// 0: Sản phẩm ngừng bán
// >= 1: Sản phẩm đang bán
// 1: Sản phẩm bán
// 2: Sản phẩm khuyến mãi
// 3: Sản phẩm nổi bật
// 4: Sản phẩm mới
// Nếu không nhập limit thì mặc định là lấy hết

const getAllDevice_User = async (page = 0, status = 1, limit = {},filters = {}) => {
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
        whereConditions[Op.or] = [
            { name: { [Op.like]: `%${keyword}%` } },
            { descriptionNormal: { [Op.like]: `%${keyword}%` } }
        ];
    }

    const offset = page * limit;

    const data = await Device.findAll({
        where: whereConditions,
        limit: limit,
        offset: offset,
        subQuery: false,
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
        group: ['Device.idDevice']
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
    const comments = await ReviewDevice.findAll({
        where: {
            idDevice: id,
            status: status
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
    getAllDevice_User, getAllDevice_Admin,
    getDeviceById, getTOPDeviceLiked,
    createDevice, updateDevice, updateStatusDevice,
    updateStatusDeviceByCategory,

    //Review For Device
    getAllReviewForDevice, createReviewForDevice,
    updateReviewForDevice, updateStatusReviewForDevice
}