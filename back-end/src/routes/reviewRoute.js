const express = require('express');
const {
    getAllReviewByIdCustomerAPI
} = require('../controllers/api/ReviewController');
const routerOrder = express.Router();


routerOrder.get('/:id', getAllReviewByIdCustomerAPI );

module.exports = routerOrder;
