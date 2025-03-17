const Unit = require('../models/Unit');
const { Op } = require('sequelize');

const getUnit = async () => {
 return await Unit.findAll();
};
const getUnitById = async (id) => {
    const unit = await Unit.findByPk(id);
    return unit;
};

const postUnit = async (data) => {
    // Kiểm tra xem name đã tồn tại chưa
    const existing = await Unit.findOne({ where: { name: data.name } });
    if (existing) {
        throw new Error("Tên đã tồn tại");
    }

    // Nếu không trùng thì tạo mới
    const newDVT = await Unit.create(data);
    return newDVT;
};




const putUnit = async (id, name) => {
    // Kiểm tra xem name đã tồn tại (trừ id đang cập nhật)
    const existing = await Unit.findOne({ 
        where: { name: name, id: { [Op.ne]: id } } 
    });

    if (existing) {
        throw new Error("Tên đã tồn tại");
    }

    // Tìm đơn vị tính theo ID
    const unit = await Unit.findByPk(id);
    if (!unit) {
        throw new Error("Không tìm thấy đơn vị tính");
    }

    // Cập nhật name
    unit.name = name;
    await unit.save();

    return unit;
};


const deleteUnit = async (id) => {
    const unit = await Unit.findByPk(id);
    
    if (!unit) {
        return { errorCode: 3, message: "Không tìm thấy đơn vị tính" };
    }

    await unit.destroy();
    return { errorCode: 0, message: "Xóa thành công" };
};


module.exports = {
    getUnit,
    postUnit,
    putUnit,
    deleteUnit,
    getUnitById
};