const { where, Model } = require('sequelize');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Review = require('../models/Review_device');
const Device = require('../models/Device');

const getAllReviewByIdCustomer = async (idCustomer) => {
    const reviews = await Review.findAll({
        where: { idCustomer },
        include: [
            {
                model: Device,
                as: 'device',
                attribute: [ 'image',]
            }
        ]
    });
    return reviews;
}

module.exports = {
    getAllReviewByIdCustomer
}