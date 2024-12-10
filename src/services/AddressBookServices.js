const connection = require('../config/database');
const AddressBooks = require('../models/Address_book');

// Lấy tất cả địa chỉ
const getAllAddressBooks = async() => {
    return await AddressBooks.findAll();
}

