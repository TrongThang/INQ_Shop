const express = require('express');
const {
    getAllInfoWebsiteAPI,
    postAddToInfoWebsiteAPI,
    putUpdateInfoWebsiteAPI,
    putUpdateStatusInfoWebsiteAPI,
} = require('../controllers/api/InfoWebsiteController');
const routerInfoWebsite = express.Router();


routerInfoWebsite.get('/', getAllInfoWebsiteAPI );
routerInfoWebsite.post('/', postAddToInfoWebsiteAPI);
routerInfoWebsite.put('/', putUpdateInfoWebsiteAPI);
routerInfoWebsite.put('/status', putUpdateStatusInfoWebsiteAPI);

module.exports = routerInfoWebsite;