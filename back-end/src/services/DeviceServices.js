const connection = require('../config/database');
const { Op, Sequelize, or, where } = require('sequelize');
const { convertToSlug } = require('../helpers/stringHelper');
const Category = require('../models/Category');
const Device = require('../models/Device');
// const { Device, ReviewDevice } = require('../models/Init-models');
const ReviewDevice = require('../models/Review_device');
const Customer = require('../models/Customer');
const Warehouse = require('../models/Warehouse');
const Attribute = require('../models/Attribute');
const AttributeDevice = require('../models/Attribute_device');
const Attribute_group = require('../models/Attribute_group');
const { getChildrenCategory, getAllCategoryIds } = require('./CategoryServices');
const OrderDetail = require('../models/Order_detail');
const { ERROR_MESSAGES, ERROR_CODES } = require('../../../contants');

const checkDevice = async (deviceReceive) => {
    try {
        console.log('deviceReceive:', deviceReceive)
        console.log('ID - deviceReceive:', deviceReceive.idDevice)
        const deviceCheck = await Device.findOne({
            where: {
                idDevice: deviceReceive.idDevice
            },
            include: [
                {
                    model: Warehouse,
                    as: 'warehouse',
                    attributes: ['stock']
                }
            ]
        });

        console.log('deviceCheck:', deviceCheck)

        const isDifferentSellingPrice = Number(deviceCheck.sellingPrice) !== Number(deviceReceive.sellingPrice);
        const noDeviceInStock = deviceReceive.quantity > deviceCheck.warehouse.stock;
        console.log('isDifferentSellingPrice:', isDifferentSellingPrice)
        console.log('noDeviceInStock:', noDeviceInStock)
        // Sản phẩm bị tắt thì sao
        if (!deviceCheck) {
            return {
                errorCode: ERROR_CODES.DEVICE.DEVICE_NOT_FOUND,
                detail: ERROR_MESSAGES[ERROR_CODES.DEVICE.PRICE_CHANGED],
                idDevice: deviceCheck.idDevice,
            };
        }
        if (deviceCheck.status >= 0) {
            
        }

        if (isDifferentSellingPrice) {
            return {
                errorCode: ERROR_CODES.DEVICE.PRICE_CHANGED,
                detail: ERROR_MESSAGES[ERROR_CODES.DEVICE.PRICE_CHANGED],
                idDevice: deviceCheck.idDevice,
                sellingPriceNew: deviceCheck.sellingPrice
            };
        }

        if (noDeviceInStock) {
            return {
                errorCode: ERROR_CODES.DEVICE.OUT_OF_STOCK,
                detail: ERROR_MESSAGES[ERROR_CODES.DEVICE.OUT_OF_STOCK],
                idDevice: deviceCheck.idDevice,
                stockDeviceRemaining: deviceCheck.warehouse.stock
            };
        }

        return {
            errorCode: ERROR_CODES.SUCCESS,
            detail: ERROR_MESSAGES[ERROR_CODES.DEVICE.SUCCESS]
        };

    } catch (error) {
        return {
            errorCode: ERROR_CODES.DEVICE.INTERNAL_ERROR,
            detail: error || ERROR_MESSAGES.DEVICE[ERROR_CODES.DEVICE.INTERNAL_ERROR]
        }
    }
} 


// HÀM XỬ LÝ
function groupAttributesByGroup(attributeDeviceList) {
    const result = {};

    attributeDeviceList.forEach((item) => {
        const group = item.attributes.attributeGroup?.dataValues || {}; // Lấy `dataValues` hoặc đối tượng rỗng

        const groupId = group.id || null; // Lấy id nhóm hoặc null

        const groupName = group.name; // Lấy tên nhóm

        // Nếu nhóm chưa tồn tại trong kết quả, tạo mới
        if (!result[groupId]) {
            result[groupId] = {
                idAttributeGroup: groupId,
                nameGroup: groupName,
                attributes: [],
            };
        }

        // Thêm thuộc tính vào danh sách của nhóm
        result[groupId].attributes.push({
            nameAttribute: item.attributes.nameAttribute,
            required: item.attributes.required,
            value: item.value,
            status: item.status,
        });
    });

    // Trả về danh sách các nhóm thuộc tính
    return Object.values(result);
}

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
                    [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
                ],
                required: false
            }
        ],
        group: ['Device.idDevice'],
        attributes: {
            include: [
                [
                    Sequelize.literal('sellingPrice * 0.95'), // Calculate discount price directly
                    'discountPrice'
                ]
            ]
        }

    });
    // const devicesWithDiscount = data.map(device => {
    //     const sellingPrice = Number(device.sellingPrice);
    //     const discountPrice = sellingPrice * 0.95; // Calculate 5% discount
    //     return {
    //         ...device.toJSON(),
    //         discountPrice
    //     };
    // });
    return data; // Trả về danh sách sản phẩm
};

const getTopSellingDevice = async () => {
    const data = await Device.findAll({
        where: {
            status: {
                [Op.gte]: 1
            }
        },
        subQuery: false,
        include: [
            {
                model: ReviewDevice,
                as: 'reviews',
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
                ],
                required: false
            },
            {
                model: OrderDetail,
                as: 'order_device',
                attributes: [], 
                required: false
            }
        ],
        group: ['Device.idDevice'],
        attributes: {
            include: [
                [Sequelize.fn('SUM', Sequelize.col('order_device.stock')), 'totalSold'],
            ]
        },
        order: [[Sequelize.literal('totalSold'), 'DESC']],
        limit: 10,
    })

    return data;
}

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
            },
            {
                model: Warehouse,
                as: 'warehouse',
                attributes: [] // Không cần trả về riêng biệt, vì sẽ đưa vào attributes của Device
            }
        ],
        attributes: [
            'idDevice', 'name', 'slug', 'sellingPrice', 'image', 'descriptionNormal', 'status',
            [Sequelize.col('warehouse.stock'), 'stock']
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

    let device = await Device.findOne({
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
            },
            {
                model: Warehouse,
                as: 'warehouse',
                attributes: []
            },
        ],
        attributes: {
            include: [
                [Sequelize.literal(`(
                    SELECT AVG(rating)
                    FROM review_device AS review
                    WHERE review.idDevice = Device.idDevice
                )`), 'averageRating'],
                [Sequelize.col('warehouse.stock'), 'stock']
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

    const attributeDevice = await AttributeDevice.findAll({
        where: {
            idDevice: device.idDevice
        },
        include: [
            {
                model: Attribute,
                as: 'attributes',
                include: [
                    {
                        model: Attribute_group,
                        as: 'attributeGroup',
                        attributes: ['id', 'name']
                    }
                ],
                attributes: ['nameAttribute', 'required']

            }
        ],
        attributes: ['value', 'status']
    })

    device = device.toJSON();

    device.reviews = review;

    device.attributes = groupAttributesByGroup(attributeDevice);

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

const updateStatusDevice = async (data) => {
    console.log("req.body: ",data);
    const valueIsHide = (data.status == 0) ? true : false;

    const [updatedCount] = await Device.update(
        {
            status: data.status,
            isHide: valueIsHide
        },
        { where: { idDevice: data.idDevice } }
    );

    return updatedCount;
}

const increaseViewDevice = async ({ idDevice }) => {
    const device = await Device.findOne({ where: { idDevice } });

    if (!device) {
        throw new Error('Không tìm thấy thiết bị'); 
    }

    const newViewCount = device.views + 1;

    const [updatedCount] = await Device.update(
        { views: newViewCount }, 
        { where: { idDevice } } 
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

const getAllReviewForDevice = async (idDevice) => {
    const comments = await ReviewDevice.findAll({
        where: {
            idDevice: idDevice
        },
        include: [
            {
                model: Customer,
                as: 'customerReview'
            }
        ],
        order: [['updated_at', 'DESC']]
    });

    return comments;
}

const getReviewForCustomer = async (idDevice, idCustomer) => {
    const comments = await ReviewDevice.findOne({
        where: {
            idDevice: idDevice,
            idCustomer: idCustomer
        }
    });
    
    return comments;
}

const createReviewForDevice = async (body) => {
    const { idCustomer, idDevice, comment, rating } = body.comment;
    console.log('Data trc create:', idCustomer, idDevice, comment, rating)

    const reviewForDevice = await ReviewDevice.create({ idCustomer, idDevice, comment, rating });

    return reviewForDevice;
}

const updateReviewForDevice = async ( idReview, body ) => {
    const {idCustomer, idDevice, comment, rating } = body.comment;
    
    const [updatedCount] = await ReviewDevice.update(
        { idCustomer, idDevice, comment, rating },
        {
        where: { idReview }
        }
    );

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
    checkDevice,
    getAllDevice_User, getAllDeviceByStatus, getAllDevice_Admin, 
    getDeviceBySlug, getTOPDeviceLiked, getTopSellingDevice, 
    createDevice, updateDevice, updateStatusDevice,
    updateStatusDeviceByCategory, increaseViewDevice,

    //Review For Device
    getReviewForCustomer,
    getAllReviewForDevice, createReviewForDevice,
    updateReviewForDevice, updateStatusReviewForDevice,
}