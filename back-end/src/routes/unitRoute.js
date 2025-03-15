const express = require('express');
const { getDonViTinhAPI, postDonViTinhAPI, putDonViTinhAPI, deleteDonViTinhAPI } = require('../controllers/api/UnitController');

const routerUnit = express.Router();

router.get('/unit', getDonViTinhAPI);
router.post('/unit', postDonViTinhAPI);
router.put('/unit/:id', putDonViTinhAPI);
router.delete('/unit/:id', deleteDonViTinhAPI);

module.exports = routerUnit;