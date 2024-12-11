const connection = require('../../config/database.js');
const AddressBook = require('../../models/Address_book.js');

const {
    getAllAddressBooks,
    getAddressBookById,
    createAddressBook,
    updateAddressBook
} = require('../../services/AddressBookServices');

//Lấy tất cả địa chỉ bằng API
const getAllAddressBookAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const addressBooks = await getAllAddressBooks();
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

//Lấy một địa chỉ bằng API
const getAddressBookAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const data = req.body;
        const addressBook = await getAddressBookById(data);
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

//Tạo một địa chỉ bằng API
const postCreateAddressBookAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const data = req.body;
        console.log(">>>check data",data);
        const newAddressBook = await createAddressBook(data);
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

//Sửa một địa chỉ bằng API
const putUpdateAddressBookAPI = async (req, res) => {
    //TO DO SOMETHING
    try {
        const data = req.body;
        const updatedAddressBook = await updateAddressBook(data);
        res.status(200).json({
            success: true,
            message: 'Cập nhật địa chỉ thành công',
            data: updatedAddressBook,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi cập nhật địa chỉ',
            error: error.message,
        });
    }
}
    
module.exports = {
    getAllAddressBookAPI,
    getAddressBookAPI,
    postCreateAddressBookAPI,
    putUpdateAddressBookAPI,
}