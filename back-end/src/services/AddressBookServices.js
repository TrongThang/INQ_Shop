const connection = require('../config/database');
const AddressBooks = require('../models/Address_book');
const Customer = require('../models/Customer');
const Sequelize = require('../config/database');

// Lấy tất cả địa chỉ
const getAllAddressBooks = async () => {
    return await AddressBooks.findAll();
}

// Lấy địa chỉ theo ID
const getAllAddressBookByIdCustomer = async (idCustomer) => {
    return await AddressBooks.findAll({
        where: { idCustomer },
        include: [
            {
                model: Customer,
                as: 'customer',
                attributes: ['surname', 'lastName', 'phone'],
            },
        ],
    });
};


// Tạo mới một địa chỉ
const createAddressBook = async (data) => {
    const transaction = await Sequelize.transaction();
    if (data.isDefault === true) {
        //Đặt tất cả isDefault về false
        await AddressBooks.update(
            { isDefault: false },
            { where: { idCustomer: data.idCustomer }, transaction }
        );
    }
    await AddressBooks.create(data, { transaction });
    await transaction.commit();
    return true;
};

// Cập nhật thông tin địa chỉ
// Cập nhật thông tin địa chỉ
const updateAddressBook = async (id, idCustomer, data) => {
    // Kiểm tra xem địa chỉ có tồn tại hay không
    const addressBook = await AddressBooks.findOne({
        where: {
            id: id,
            idCustomer: idCustomer, // Kiểm tra xem idCustomer có khớp với địa chỉ không
        },
    });

    if (!addressBook) {
        throw new Error('Không tìm thấy địa chỉ với id và idCustomer này!');
    }

    // Nếu isDefault = true, cập nhật trạng thái
    if (data.isDefault == 1) {
        // Cập nhật trạng thái mặc định cho địa chỉ
        await updateStatusAddressBook(id, idCustomer, data); // Cập nhật trạng thái mặc định
    } else {
        // Cập nhật thông tin địa chỉ nếu không phải là địa chỉ mặc định
        await addressBook.update(data);
    }

    return addressBook; // Trả về địa chỉ đã được cập nhật
};

// Cập nhật trạng thái của địa chỉ
const updateStatusAddressBook = async (id ,idCustomer, data) => {
    const transaction = await Sequelize.transaction();
    try {
        // Đặt tất cả địa chỉ của khách hàng thành isDefault: false
        await AddressBooks.update(
            { isDefault: 0 },
            { where: { idCustomer }, transaction }
        );

        // Tìm địa chỉ được chọn và cập nhật isDefault: true
        const addressBook = await AddressBooks.findByPk(id, { transaction });
        if (!addressBook) {
            throw new Error('Không tìm thấy địa chỉ!');
        }

        // Cập nhật địa chỉ được chọn thành isDefault: true
        await addressBook.update({ isDefault: 1 }, { transaction });

        // Commit transaction
        await transaction.commit();
    } catch (error) {
        await transaction.rollback(); // Rollback nếu có lỗi xảy ra
        throw error; // Ném lại lỗi
    }
};

const removeAddressBookById = async (id, idCustomer) => {
    const transaction = await Sequelize.transaction();
    try {
        // Kiểm tra xem địa chỉ có tồn tại hay không
        const addressBook = await AddressBooks.findOne({
            where: {
                id: id,
                idCustomer: idCustomer, // Kiểm tra xem idCustomer có khớp với địa chỉ không
                isDefault: 0
            },
        });

        if (!addressBook) {
            throw new Error('Không tìm thấy địa chỉ với id và idCustomer này!');
        }

        // Xóa địa chỉ
        await addressBook.destroy({ transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    getAllAddressBooks,
    getAllAddressBookByIdCustomer,
    createAddressBook,
    updateAddressBook,
    removeAddressBookById
};