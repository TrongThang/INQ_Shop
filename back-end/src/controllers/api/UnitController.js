const { getDonViTinh, postDonViTinh, putDonViTinh, deleteDonViTinh } = require('../../services/UnitServices');

const getDonViTinhAPI = async (req, res) => {
    try {
        const { filter, limit, page, order, sort } = req.query;
        const response = await getDonViTinh(filter, limit, page, order, sort);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ errorCode: 1, message: error.message });
    }
};

const postDonViTinhAPI = async (req, res) => {
    try {
        const { ten } = req.body;
        const response = await postDonViTinh(ten);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ errorCode: 1, message: error.message });
    }
};

const putDonViTinhAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const response = await putDonViTinh(id, name);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ errorCode: 1, message: error.message });
    }
};

const deleteDonViTinhAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteDonViTinh(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ errorCode: 1, message: error.message });
    }
};

module.exports = {
    getDonViTinhAPI,
    postDonViTinhAPI,
    putDonViTinhAPI,
    deleteDonViTinhAPI,
};