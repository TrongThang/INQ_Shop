const connection = require('../../config/database.js');
const AddressBook = require('../../models/Address_book.js');

const {
    getAllAddressBooks,
    getAllAddressBookByIdCustomer,
    createAddressBook,
    updateAddressBook,
    removeAddressBookById
} = require('../../services/AddressBookServices');


//Lấy tất cả địa chỉ bằng API
const getAllAddressBookAPI = async (req, res) => {
    //TO DO SOMETHING
    const addressBooks = await getAllAddressBooks();
    res.status(200).json({
        success: true,
        data: addressBooks
    });
}

//Lấy tất cả địa chỉ của một khách hàng bằng API
const getAddressBooksByIdCustomerAPI = async (req, res) => {
    //TO DO SOMETHING
    const { idCustomer } = req.params;
    const addressBook = await getAllAddressBookByIdCustomer(idCustomer);
    if(!addressBook){
        return res.status(404).json({
            success: false,
            message: `Không tìm thấy địa chỉ có ID ${idCustomer}`,
        });
    }
    res.status(200).json({
        success: true,
        data: addressBook,
    });
};

//Lấy tất cả địa chỉ của một khách hàng bằng API


const getAllOrSingleAddressBookAPI = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            // Lấy một địa chỉ nếu có id
            getAddressBookAPI(req, res);
        } else {
            // Lấy tất cả nếu không có id
            getAllAddressBookAPI(req, res);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi xử lý yêu cầu.' });
    }
};

//Tạo một địa chỉ bằng API
const postCreateAddressBookAPI = async (req, res) => {
    //TO DO SOMETHING
    try{
        const data = req.body;
        console.log(">>> check:", data);
      
        //Kiểm tra district là chuỗi hay không
        if (!data.district || typeof data.district !== 'string' || data.district.trim() === "") {
            return res.status(400).json({
                success: false,
                message: 'Trường "district" phải là chuỗi.',
            });
        }
        //Kiểm tra city là chuỗi hay không
        if (!data.city || typeof data.city !== 'string' || data.city.trim() === "") {
            return res.status(400).json({
                success: false,
                message: 'Trường "city" phải là chuỗi.',
            });
        }
        //Kiểm tra ward là chuỗi hay không
        if (!data.ward || typeof data.ward !== 'string' || data.ward.trim() === "") {
            return res.status(400).json({
                success: false,
                message: 'Trường "ward" phải là chuỗi.',
            });
        }
        //Kiểm tra street là chuỗi hay không
        if (!data.street || typeof data.street !== 'string' || data.street.trim() === "") {
            return res.status(400).json({
                success: false,
                message: 'Trường "street" phải là chuỗi.',
            });
        }
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
        const {id, idCustomer} = req.params;
        console.log(">>> check:", data);
        
        //Kiểm tra district là chuỗi hay không
     
        const updatedAddressBook = await updateAddressBook(id, idCustomer, data);
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
const removeAddressBookByIdAPI = async (req, res) => {
    //TO DO SOMETHING
    try {
        const { id, idCustomer } = req.params;
        const addressBook = await removeAddressBookById(id,idCustomer);
        if (!addressBook) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy địa chỉ có ID ${id}`,
            });
        }
        res.status(200).json({
            success: true,
            message: 'Xóa địa chỉ thành công',
            data: addressBook,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Không thể xóa địa chỉ đang làm mặc định',
            error: error.message,
        });
    }
}
    
module.exports = {
    getAllOrSingleAddressBookAPI,
    getAddressBooksByIdCustomerAPI,
    postCreateAddressBookAPI,
    putUpdateAddressBookAPI,
    removeAddressBookByIdAPI
}