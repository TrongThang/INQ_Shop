const express = require('express');
const { getObjectCountsAPI } = require('../controllers/api/StatisticsController');
const routerStatistics = express.Router();

routerStatistics.get('/object-counts', getObjectCountsAPI);

module.exports = routerStatistics;