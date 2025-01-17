const express = require('express');
const {
    getAllInfoWebsiteAPI,
    postAddToInfoWebsiteAPI,
    putUpdateInfoWebsiteAPI,
    putUpdateStatusInfoWebsiteAPI,
    getInfoWebsiteByKeyAPI,
    getAllInfoWebsiteAPI_Admin
} = require('../controllers/api/InfoWebsiteController');
const routerInfoWebsite = express.Router();


routerInfoWebsite.get('/', getAllInfoWebsiteAPI );

routerInfoWebsite.get('/admin', getAllInfoWebsiteAPI_Admin);
routerInfoWebsite.post('/', postAddToInfoWebsiteAPI);
routerInfoWebsite.put('/', putUpdateInfoWebsiteAPI);
routerInfoWebsite.put('/status', putUpdateStatusInfoWebsiteAPI);

// Route mới: Lấy thông tin website theo KEY_NAME
routerInfoWebsite.get('/:keyName', getInfoWebsiteByKeyAPI);

module.exports = routerInfoWebsite;