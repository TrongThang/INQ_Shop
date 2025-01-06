const connection = require('../config/database');
const { Op, Sequelize, or, where } = require('sequelize');
const { convertToSlug } = require('../helpers/stringHelper');
const Category = require('../models/Category');
const Device = require('../models/Device');
// const { Device, ReviewDevice } = require('../models/Init-models');
const ReviewDevice = require('../models/Review_device');
const Customer = require('../models/Customer');

// 0: Sản phẩm ngừng bán
// >= 1: Sản phẩm đang bán
// 1: Sản phẩm bán
// 2: Sản phẩm khuyến mãi
// 3: Sản phẩm nổi bật
// 4: Sản phẩm mới
// 5: sản phẩm bán chạy
// Nếu không nhập limit thì mặc định là lấy hết
const getAllDeviceByStatus = async (status = 1, limit = {}) => {
    const whereConditions = {
        status: {
            [Op.eq]: status
        }
    };

    const data = await Device.findAll({
        where: whereConditions,
        limit: limit,
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

    return data; // Trả về danh sách sản phẩm
};


const getAllDevice_User = async (page = 0, status = 1, limit = {}, filters = {}, order = {}) => {
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
            },
            {
                model: Category,
                as: 'categoryDevice',
                attributes: ['id', 'nameCategory']
            }
        ],
        attributes: [
            'idDevice', 'name', 'slug', 'sellingPrice', 'image', 'descriptionNormal',
        ],
        group: ['Device.idDevice'],
        order: order,
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

const getDeviceBySlug = async (slug) => {
    const device = await Device.findOne({
        where: {
            slug: slug
        },
        subQuery: false,
        include: [
            {
                model: Category,
                as: 'categoryDevice',
                attributes: ['id', 'nameCategory']
            },
            {
                model: ReviewDevice,
                as: 'reviews',
                attributes: [
                    'comment', 'rating', 'created_at', 'updated_at'],
                include: [{
                    model: Customer,
                    as: 'customerReview',
                    attributes: ['surname', 'lastName', 'image']
                }],
                required: false
            }
        ],
        attributes: {
            include: [
                [Sequelize.literal(`(
                    SELECT AVG(rating)
                    FROM review_device AS review
                    WHERE review.idDevice = Device.idDevice
                )`), 'averageRating']
            ]
        },
    });

    const review = await ReviewDevice.findAll({
        where: {
            idDevice: device.idDevice,
        },
        include: [{
            model: Customer,
            as: 'customerReview',
            attributes: ['surname', 'lastName', 'image']
        }],
        attributes: [
            'comment', 'rating', 'created_at', 'updated_at'
        ],
        order: [['created_at', 'DESC']]
    })

    device.reviews = review;

    return device;
}

const createDevice = async (body) => {
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

const updateStatusDevice = async ({ id, status }) => {
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

const createReviewForDevice = async (body) => {
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
    getAllDevice_User, getAllDeviceByStatus, getAllDevice_Admin, 
    getDeviceBySlug, getTOPDeviceLiked,
    createDevice, updateDevice, updateStatusDevice,
    updateStatusDeviceByCategory,

    //Review For Device
    getAllReviewForDevice, createReviewForDevice,
    updateReviewForDevice, updateStatusReviewForDevice,
}