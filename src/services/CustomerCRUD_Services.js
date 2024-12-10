const connection = require('../config/database');

// Lấy danh sách tất cả khách hàng
const getAllCustomers = async () => {
    let [results] = await connection.query('SELECT * FROM CUSTOMER');
    return results;
};

// Lấy thông tin khách hàng theo ID
const getCustomerById = async (id) => {
    let [results] = await connection.query('SELECT * FROM CUSTOMER WHERE id = ?', [id]);
    return results[0];
};

// Thêm một khách hàng mới
const createCustomer = async (surname, lastName, phone, identityNumber, birthdate, gender, email, status) => {
    const sql = `
        INSERT INTO CUSTOMER (surname, lastName, phone, identityNumber, birthdate, gender, email, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    let [results] = await connection.query(sql, [surname, lastName, phone, identityNumber, birthdate, gender, email, status]);
    return results.insertId;
};

// Cập nhật thông tin khách hàng
const updateCustomer = async (id, surname, lastName, phone, identityNumber, birthdate, gender, email, status) => {
    const sql = `
        UPDATE CUSTOMER
        SET surname = ?, lastName = ?, phone = ?, identityNumber = ?, birthdate = ?, gender = ?, email = ?, status = ?, updated_at = NOW()
        WHERE id = ?
    `;
    let [results] = await connection.query(sql, [surname, lastName, phone, identityNumber, birthdate, gender, email, status, id]);
    return results.affectedRows; // Số dòng bị ảnh hưởng
};

// Xóa khách hàng theo ID  --Maybe
const deleteCustomer = async (id) => {
    let [results] = await connection.query('DELETE FROM CUSTOMER WHERE id = ?', [id]);
    return results.affectedRows; // Số dòng bị ảnh hưởng
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
