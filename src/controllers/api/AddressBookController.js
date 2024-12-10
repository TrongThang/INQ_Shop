const connection = required('../config/database');
const AddressBook = require('../models/AddressBook.js');

const {
    getAllAddressBooks,
    getAddressBookById,
    createAddressBook,
    updateAddressBook,
    deleteAddressBook,
} = require('../services/AddressBookCRUD_Services');

//Lấy tất cả danh sách địa chỉ
const getAllAddressBookAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const addressBooks = await AddressBook.findAll();
        res.status(200).json({
            success: true,
            data: addressBooks
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi truy xuất địa chỉ',
            error: error.message,
        });
    }
}

//Lấy một địa chỉ
const getAddressBookAPI = async (req, res) => {
    //TO DO SOMETHING
    const {id} = req.params;
    try{
        const addressBook = await AddressBook.findByPk(id);
        if(!addressBook){
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy địa chỉ có ID ${id}`,
            });
        }
        res.status(200).json({
            success: true,
            data: addressBook,
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi lấy địa chỉ',
            error: error.message,
        });
    }
};


//Tạo một địa chỉ
const postCreateAddressBookAPI = async (req, res) => {
    //TO DO SOMETHING
    const { disrict, city, ward, street, isDefault } = req.body;
    try{
        const newAddressBook = await AddressBook.create({
            disrict,
            city,
            ward,
            street,
            isDefault,
        });
        res.status(201).json({
            success: true,
            message: 'Thêm địa chỉ thành công',
            data: newAddressBook,
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi tạo địa chỉ',
            error: error.message,
        });
    }
}

//Sửa một địa chỉ
const putUpdateAddressBookAPI = async (req, res) => {
    //TO DO SOMETHING
    const {id} = req.params;
    const { disrict, city, ward, street, isDefault } = req.body;
    try{
        const addressBook = await AddressBook.findByPk(id);
        if(!addressBook){
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy địa chỉ có ID ${id}`,
            });
        }
        await addressBook.update({
            disrict,
            city,
            ward,
            street,
            isDefault,
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Lỗi cập nhật địa chỉ',
            error: error.message,
        });
    }
}

//Xóa một địa chỉ
const deleteAddressBookAPI = async (req, res) => {
    //TO DO SOMETHING
    const { id } = req.params;
    try {
        const addressBook = await AddressBook.findByPk(id);
        if (!addressBook) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy địa chỉ có ID ${id}`,
            });
        }
        await addressBook.destroy(); // Sequelize method
        res.status(200).json({
            success: true,
            message: 'Xóa địa chỉ thành công',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi xóa địa chỉ',
            error: error.message,
        });
    }
}
    
module.exports = {
    getAllAddressBookAPI,
    getAddressBookAPI,
    postCreateAddressBookAPI,
    putUpdateAddressBookAPI,
    deleteAddressBookAPI
}