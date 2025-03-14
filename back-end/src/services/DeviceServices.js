const connection = require('../config/database');
const { Op, Sequelize, or, where } = require('sequelize');
const { convertToSlug } = require('../helpers/string');
const Category = require('../models/Category');
const Device = require('../models/Device');
const { get_error_response } = require('../helpers/response')
// const { Device, ReviewDevice } = require('../models/Init-models');
const ReviewDevice = require('../models/Review_device');
const Customer = require('../models/Customer');
const Attribute = require('../models/Attribute');
const AttributeDevice = require('../models/Attribute_device');
const Attribute_group = require('../models/Attribute_group');
const { getChildrenCategory, getAllCategoryIds } = require('./CategoryServices');
const OrderDetail = require('../models/Order_detail');
const { ERROR_MESSAGES, ERROR_CODES } = require('../docs/contants');
const { STATUS_CODES } = require('../../../statusContaints');
const Liked = require('../models/Liked');
const { isExistId, validate_name, validate_number } = require('../helpers/validate');
const { check_reference_existence } = require('../helpers/sql_query')

const checkDevice = async (deviceReceive) => {
    try {
        console.log('SP mua:', deviceReceive)
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
        
        const isDifferentSellingPrice = Number(deviceCheck.sellingPrice) !== Number(deviceReceive.sellingPrice);
        const noDeviceInStock = deviceReceive.quantity > (deviceCheck.warehouse.stock === null ? 0 : deviceCheck.warehouse.stock);

        console.log('Điều kiện kiểm tra thiết bị:', isDifferentSellingPrice, noDeviceInStock)
        
        // Không tìm thấy Thiết bị
        if (!deviceCheck) {
            return {
                errorCode: ERROR_CODES.DEVICE.DEVICE_NOT_FOUND,
                detail: ERROR_MESSAGES.DEVICE[ERROR_CODES.DEVICE.DEVICE_NOT_FOUND],
                idDevice: deviceCheck.idDevice,
            };
        }

        if (deviceCheck.status <= STATUS_CODES.DEVICE.NON_ACTIVE) {
            return {
                errorCode: ERROR_CODES.DEVICE.DEVICE_NON_ACTIVE,
                idDevice: deviceCheck.idDevice,
                detail: ERROR_MESSAGES.DEVICE[ERROR_CODES.DEVICE.DEVICE_NON_ACTIVE],
            };
        }

        if (isDifferentSellingPrice) {
            return {
                errorCode: ERROR_CODES.DEVICE.PRICE_CHANGED,
                detail: ERROR_MESSAGES.DEVICE[ERROR_CODES.DEVICE.PRICE_CHANGED],
                idDevice: deviceCheck.idDevice,
                sellingPriceNew: deviceCheck.sellingPrice
            };
        }

        if (noDeviceInStock) {
            return {
                errorCode: ERROR_CODES.DEVICE.OUT_OF_STOCK,
                detail: ERROR_MESSAGES.DEVICE[ERROR_CODES.DEVICE.OUT_OF_STOCK],
                idDevice: deviceCheck.idDevice,
                name: deviceCheck.name,
                quantityInitial: deviceReceive.quantity,
                stockDeviceRemaining: deviceCheck.warehouse.stock,
            };
        }

        console.log(`Tên thiết bị. Cũ: ${deviceCheck.name} - Mới: ${deviceReceive.name}`)
        if (deviceCheck.name != deviceReceive.name) {
            return {
                errorCode: ERROR_CODES.DEVICE.NAME_CHANGED,
                detail: ERROR_MESSAGES.DEVICE[ERROR_CODES.DEVICE.NAME_CHANGED],
                idDevice: deviceCheck.idDevice,
                name: deviceCheck.name,
            };
        }

        return {
            errorCode: ERROR_CODES.SUCCESS,
            detail: ERROR_MESSAGES.DEVICE[ERROR_CODES.SUCCESS]
        };

    } catch (error) {
        return {
            errorCode: ERROR_CODES.DEVICE.INTERNAL_ERROR,
            detail: error || ERROR_MESSAGES.DEVICE[ERROR_CODES.DEVICE.INTERNAL_ERROR]
        }
    }
} 

const checkListDevice = async (products) => {
    try {
        const devicesChanged = [];
        for (const product of products) {
            const result = await checkDevice(product);

            if (result.errorCode !== ERROR_CODES.SUCCESS) {
                devicesChanged.push(result);
                // return result;
            }
        }

        if (devicesChanged.length > 0) {
            return devicesChanged;
        }

        return {
            errorCode: ERROR_CODES.SUCCESS,
        }
    } catch (error) {
        return {
            errorCode: ERROR_CODES.ORDER.INTERNAL_ERROR,
            detail: error.message || ERROR_MESSAGES.ORDER[ERROR_CODES.ORDER.INTERNAL_ERROR]
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
const getDeviceByCategory = async ({idDevice ,idCategory, limit = 5 }) => {
    try {
        const data = await Device.findAll({
            where: {
                idCategory,
                idDevice: {
                    [Op.ne]: idDevice
                }
            },
            include: [
                {
                    model: Category, // Kết hợp với model Category
                    as:'categoryDevice',
                    attributes: ['id', 'nameCategory'] // Chỉ lấy các trường cần thiết từ Category
                }
            ],
            limit: limit // Giới hạn số lượng kết quả
        });
        return data;
    } catch (error) {
        throw new Error("Error fetching devices: " + error.message);
    }
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

const getAllDevice_User = async (page = 0, status = 1, limit = 15, filters = {}, order = {}) => {
    const { priceMin, priceMax, keyword } = filters;

    const whereConditions = {
        status: { [Op.gte]: status },
        ...(priceMin != undefined && { sellingPrice: { [Op.gte]: priceMin } }),
        ...(priceMax != undefined && { sellingPrice: { [Op.lte]: priceMax } }),
        ...(keyword && {
            [Op.or]: [
                { name: { [Op.like]: `%${keyword}%` } },
                { descriptionNormal: { [Op.like]: `%${keyword}%` } }
            ]
        })
    };

    const includeConfig = [
        // {
        //     model: ReviewDevice,
        //     as: 'reviews',
        //     attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']],
        //     required: false
        // },
        {
            model: Category,
            as: 'categoryDevice',
            attributes: ['id', 'nameCategory']
        },
        {
            model: Warehouse,
            as: 'warehouse',
            attributes: []
        }
    ];

    const offset = page * limit;

    const totalCount = await Device.count({
        where: whereConditions,
        include: includeConfig,
        distinct: true
    });

    const data = await Device.findAll({
        where: whereConditions,
        limit,
        offset,
        include: includeConfig,
        attributes: [
            'idDevice', 'name', 'slug', 'sellingPrice', 'image', 'descriptionNormal', 'status',
            [Sequelize.col('warehouse.stock'), 'stock'],
            [Sequelize.literal('(SELECT AVG(rating) FROM review_device WHERE review_device.idDevice = Device.idDevice)'), 'averageRating']
        ],
        group: ['Device.idDevice'],
        order,
        subQuery: false,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return { data, totalPages, totalCount };
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
            {
                model: Liked,
                as: 'liked',
                attributes: []
            }
        ],
        attributes: {
            include: [
                [Sequelize.literal(`(
                    SELECT AVG(rating)
                    FROM review_device AS review
                    WHERE review.idDevice = Device.idDevice
                )`), 'averageRating'],
                [Sequelize.col('warehouse.stock'), 'stock'],
                [Sequelize.literal(`(
                    SELECT COUNT(idDevice)
                    FROM liked AS liked
                    WHERE liked.idDevice = Device.idDevice
                )`), 'likeCount'],
            ]
        },
        group: ['Device.idDevice'],
    });

    const review = await ReviewDevice.findAll({
        where: {
            idDevice: device.idDevice,
            status: {
                [Op.gte]: 1,
                [Op.ne]: null
            } 
        },
        include: [{
            model: Customer,
            as: 'customerReview',
            attributes: ['surname', 'lastName', 'image']
        }],
        attributes: [
            'comment', 'rating', 'created_at', 'updated_at', 'status'
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

const getCheckNameDevice = async (name) => {
    let device = await Device.findOne({
        where: {
            name: name
        },
    });

    
    if (device) {
        return true;
    }

    return false;
}

const getCheckSlugDevice = async (slug) => {
    const { count } = await Device.findAndCountAll({
        where: {
            slug: slug
        }
    });

    return count;
}

const getDeviceBySlugForAdmin = async (slug) => {
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
                model: Warehouse,
                as: 'warehouse',
                attributes: []
            },
            {
                model: Liked,
                as: 'liked',
                attributes: []
            }
        ],
        attributes: {
            include: [
                [Sequelize.literal(`(
                    SELECT AVG(rating)
                    FROM review_device AS review
                    WHERE review.idDevice = Device.idDevice
                )`), 'averageRating'],
                [Sequelize.col('warehouse.stock'), 'stock'],
                [Sequelize.literal(`(
                    SELECT COUNT(idDevice)
                    FROM liked AS liked
                    WHERE liked.idDevice = Device.idDevice
                )`), 'likeCount'],
            ]
        },
        group: ['Device.idDevice'],
    });

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

    device.attributes = groupAttributesByGroup(attributeDevice);

    return device;
}

const createDevice = async (deviceSend) => {
    const { id, category_id, unit_id, warranty_time_id } = deviceSend
    
    const result_check = check_id_reference_for_device(device_id = id, category_id = category_id, unit_id = unit_id, warranty_time_id = warranty_time_id)

    if (result_check) 
        return result_check
    
    error = validate_name(name = deviceSend.name, model = Device)
    if (error) {
        return get_error_response(errorCode=ERROR_CODES.DEVICE.NAME_EXISTED)
    }

    error = validate_number(number = deviceSend.vat, range = 100)
    if (error) {
        return get_error_response(errorCode=ERROR_CODES.SHARED.NUMBER_RANGE_100_INVALID)
    }

    const slug         = convertToSlug(deviceSend.name);
    const isExistSlug  = getCheckSlugDevice(slug);

    if (isExistSlug > 0) {
        slug           = slug + `-${count + 1}` ;
    }
    deviceSend.slug    = slug;
    
    const deviceCreate = await Device.create({
        id: deviceSend.id,
        name: deviceSend.name,
        slug: deviceSend.slug,
        description: deviceSend.description,
        description_normal: deviceSend.description_normal,
        image: deviceSend.image,
        unit_id: deviceSend.unit_id,
        vat: deviceSend.vat,
        category_id: deviceSend.category_id,
        warranty_time_id: deviceSend.warranty_time_id, 
        status: deviceSend.status,
    });

    if (deviceSend.attributes) {
        for (attribute in deviceSend.attributes) {
            result = add_attr_device(attribute = attribute)
            
            if (result != true) {
                return result
            }
        }
    }

    return get_error_response(errorCode = ERROR_CODES.DEVICE.SUCCESS);
}

const add_attr_device = async (attribute) => {
    const {device_id, attribute_id, value} = attribute
    if (isExistId(id = device_id, model = Device) === false) {
        return get_error_response(errorCode = ERROR_CODES.DEVICE.NOT_FOUND, status_code = 406)
    }

    if (isExistId(id = attribute_id, model = Attribute) === false) {
        return get_error_response(errorCode = ERROR_CODES.ATTRIBUTE.NOT_FOUND, status_code = 406)
    }

    error = validate_name(name = value, model = Attribute);
    if (error) {
        return error
    }

    result = await AttributeDevice.create({
        device_id: device_id,
        attribute_id: attribute_id,
        value: value
    })

    return true
}
const check_id_reference_for_device = async (device_id, category_id, unit_id, warranty_time_id) => {
    if (isExistId(id = deviceSend.id, model = Device) == false) {
        return get_error_response(errorCode=ERROR_CODES.DEVICE.DEVICE_NOT_FOUND, status_code = 406)
    }

    if (isExistId(id = deviceSend.id, model = Category) == false) {
        return get_error_response(errorCode=ERROR_CODES.CATEGORY.NOT_FOUND, status_code = 406)
    }

    if (isExistId(id = deviceSend.warranty_time_id, model = WarrantyTime) == false) {
        return get_error_response(errorCode=ERROR_CODES.WARRANTY_TIME.NOT_FOUND, status_code = 406)
    }

    if (isExistId(id = deviceSend.unit_id, model = Unit) == false) {
        return get_error_response(errorCode=ERROR_CODES.UNIT.NOT_FOUND, status_code = 406)
    }

    return null
}
const updateDevice = async (deviceSend) => {
    const {id, category_id, unit_id, warranty_time_id} = deviceSend
    const result_check = check_id_reference_for_device(device_id = id, category_id = category_id, unit_id = unit_id, warranty_time_id = warranty_time_id)

    if (result_check) 
        return result_check

    error = validate_name(name = deviceSend.name, model = Device, existingId = deviceSend.id)
    if (error) {
        return get_error_response(errorCode=ERROR_CODES.DEVICE.NAME_EXISTED)
    }

    error = validate_number(number = deviceSend.vat, range = 100)
    if (error) {
        return get_error_response(errorCode=ERROR_CODES.SHARED.NUMBER_RANGE_100_INVALID)
    }

    const slug = convertToSlug(deviceSend.name)
    deviceSend.slug = slug

    const [updatedCount] = await Device.update(
    {
        id: deviceSend.id,
        name: deviceSend.name,
        slug: deviceSend.slug,
        description: deviceSend.description,
        description_normal: deviceSend.description_normal,
        image: deviceSend.image,
        unit_id: deviceSend.unit_id,
        vat: deviceSend.vat,
        category_id: deviceSend.category_id,
        warranty_time_id: deviceSend.warranty_time_id, 
        status: deviceSend.status,
    }, {
        where: { idDevice: deviceSend.idDevice }
    });

    const attr_device_ids = await AttributeDevice
        .findAll({
            where: {
                device_id: id,
                deleted_at: null
            }
        }).map(item => item.attribute_id)
        

    if (deviceSend.attributes) {
        for (attribute in deviceSend.attributes) {
            const { attribute_id, value } = attribute
            const attr_device_id = attribute.id

            if (attr_device_ids.includes(attribute_id)) {
                // Nếu có thì cập nhật
                const [updatedCount] = await AttributeDevice.update({ value: value }, {
                        where: { id: attr_device_id, device_id: id,attribute_id: id, deleted_at: null }
                });
                
                if (updatedCount) {
                    // return get_error_response()
                }
            } else {
                //Nếu không có thì thêm
                result = add_attr_device(attribute = attribute)
                if (result) {
                    return result
                }
            }
        }

        const set_attrs_request = new Set(deviceSend.attribute)
        const ids_attr_device_delete = attr_device_ids.filters(attr => !set_attrs_request.has(attr.attribute_id))

        for (id in ids_attr_device_delete) {
            attr_device = await AttributeDevice.findByPk(id)
            
            await AttributeDevice.destroy({
                where: { id: id }
            })
        }
    }

    return get_error_response(errorCode=ERROR_CODES.DEVICE.SUCCESS);
}

const delete_device = async (id) => {
    device = await Device.findByPk(id)

    if (!device) {
        return get_error_response(ERROR_CODES.DEVICE.DEVICE_NOT_FOUND, status_code = 406)
    }

    // Hoá đơn bán hàng, nhập kho, xuất kho, giỏ hàng, thuộc tính sản phẩm, kho hàng, bình luận cho các sản phẩm này, sản phẩm yêu thích
    // error_response = check_reference_existence(model=)

    return get_error_response(ERROR_CODES.DEVICE.SUCCESS);
}

const updateStatusDevice = async (data) => {
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
            idDevice: idDevice,
            status: {
                [Op.gte]: 1
            }
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
const getAllReviewForDevice_admin = async () => {
    console.log('Get all review for admin')
    const comments = await ReviewDevice.findAll({
        include: [
            {
                model: Customer,
                as: 'customerReview'
            },
            {
                model: Device,
                as: 'device', // Thêm thông tin về thiết bị nếu cần
                 attributes: ['idDevice', 'name'] // Chỉ lấy một số trường cần thiết
            }
        ],
        order: [['created_at', 'DESC']] // Sắp xếp theo thời gian cập nhật mới nhất
    });

    return comments;
}
const getReviewById = async (idReview) => {
    try {
        const review = await ReviewDevice.findOne({
            where: { idReview },
            include: [
                {
                    model: Customer,
                    as: 'customerReview',
            
                },
                {
                    model: Device,
                    as: 'device',
                    attributes: ['idDevice', 'name']
                }
            ]
        });

        return review;
    } catch (error) {
        throw new Error(`Error fetching review by id: ${error.message}`);
    }
};

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
    const status = 1;
    const reviewForDevice = await ReviewDevice.create({ idCustomer, idDevice, comment, rating, status });

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

const updateReviewById = async (idReview, updateData) => {
    try {
        const [updatedCount] = await ReviewDevice.update(updateData, {
            where: { idReview },
        });

        if (updatedCount === 0) {
            throw new Error("Không tìm thấy review với idReview này.");
        }

        return updatedCount;
    } catch (error) {
        throw new Error(`Lỗi khi cập nhật review: ${error.message}`);
    }
};

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
    checkDevice, checkListDevice,
    getAllDevice_User, getAllDeviceByStatus, getAllDevice_Admin, 
    getDeviceBySlug, getTOPDeviceLiked, getTopSellingDevice, getDeviceByCategory,
    createDevice, updateDevice, updateStatusDevice,
    updateStatusDeviceByCategory, increaseViewDevice,

    getDeviceBySlugForAdmin, getCheckNameDevice,

    //Review For Device
    getReviewForCustomer,
    getAllReviewForDevice, getAllReviewForDevice_admin,   createReviewForDevice,
    updateReviewForDevice, updateStatusReviewForDevice,getReviewById,updateReviewById
}