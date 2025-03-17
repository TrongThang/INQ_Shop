const { getUnit, postUnit, putUnit, deleteUnit,getUnitById } = require('../../services/UnitServices');
const { ERROR_CODES, ERROR_MESSAGES } = require('../../docs/contants');
const getUnitAPI = async (req, res) => {
    try {
        const unit = await getUnit();
        res.status(200).json({
            errorCode: 0,
            data: unit,
            message: "successfully"
        });
    } catch (error) {
        res.status(ERROR_CODES.UNIT.NOT_FOUND).json({ success: false, message: ERROR_MESSAGES.UNIT.NOT_FOUND });
    }
};
const getUnitByIdAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const unit = await getUnitById(id);
        if (!unit) {
            return res.status(ERROR_CODES.UNIT.NOT_FOUND).json({ success: false, message: ERROR_MESSAGES.UNIT.NOT_FOUND });
        }
        res.status(200).json({
            errorCode: 0,
            data: unit,
            message: "successfully"
        });
    } catch (error) {
        res.status(500).json({ errorCode: 1, message: error.message });
    }
};

const postUnitAPI = async (req, res) => {
    try {
        console.log("Received data:", req.body);
        const data = req.body;

        if (!data.name) {
            return res.status(400).json({ errorCode: 2, message: "Tên không được để trống" });
        }

        const response = await postUnit(data);
        res.status(201).json(response);
    } catch (error) {
        if (error.message === "Tên đã tồn tại") {
            return res.status(400).json({ errorCode: 3, message: error.message });
        }
        res.status(500).json({ errorCode: 1, message: error.message });
    }
};


const putUnitAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ errorCode: 2, message: "Tên không được để trống" });
        }

        const response = await putUnit(id, name);
        res.status(200).json({ errorCode: 0, message: "Cập nhật thành công", data: response });
    } catch (error) {
        if (error.message === "Tên đã tồn tại") {
            return res.status(400).json({ errorCode: 3, message: error.message });
        }
        if (error.message === "Không tìm thấy đơn vị tính") {
            return res.status(404).json({ errorCode: 4, message: error.message });
        }
        res.status(500).json({ errorCode: 1, message: error.message });
    }
};


const deleteUnitAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteUnit(id);

        if (response.errorCode !== 0) {
            return res.status(404).json(response);
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ errorCode: 1, message: error.message });
    }
};



module.exports = {
    getUnitAPI,
    postUnitAPI,
    putUnitAPI,
    deleteUnitAPI,
    getUnitByIdAPI
};