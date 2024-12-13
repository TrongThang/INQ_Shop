const connection = require('../config/database');
const AddressBooks = require('../models/Address_book');
const Sequelize = require('../config/database');

// Lấy tất cả địa chỉ
const getAllAddressBooks = async() => {
    return await AddressBooks.findAll();
}

// Lấy địa chỉ theo ID
const getAddressBookById = async (id) => {
    return AddressBooks.findByPk(id);
};

// Tạo mới một địa chỉ
const createAddressBook = async (data) => {
    return AddressBooks.create(data);
};

// Cập nhật thông tin địa chỉ
const updateAddressBook = async (data) => {
    const addressBook = await AddressBooks.findByPk(data.id);
    if(data.isDefault == true){
        await updateStatusAddressBook(data);
    }
    else{
        await addressBook.update(data);
    }
    return true;
};

// Cập nhật trạng thái
const updateStatusAddressBook = async (data) => {
    const transaction = await Sequelize.transaction();
    //Đặt tất cả isDefault về false
    await AddressBooks.update({isDefault: false}, {where: {}, transaction});
    //Đặt địa chỉ được chọn thành isDefault = true
    const addressBook = await AddressBooks.findByPk(data.id, { transaction });
    if (!addressBook) {
        throw new Error('Không tìm thấy địa chỉ!');
    }
    await addressBook.update(data, { transaction });
    await transaction.commit();
};

module.exports = {
    getAllAddressBooks,
    getAddressBookById,
    createAddressBook,
    updateAddressBook,
};