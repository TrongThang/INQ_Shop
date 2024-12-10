const connection = require('../config/database');

// Lấy danh sách tất cả nhân viên
const getAllEmployees = async () => {
    let [results] = await connection.query('SELECT * FROM EMPLOYEE');
    return results;
};

// Lấy thông tin nhân viên theo ID
const getEmployeeById = async (id) => {
    let [results] = await connection.query('SELECT * FROM EMPLOYEE WHERE id = ?', [id]);
    return results[0];
};

// Thêm nhân viên mới
const createEmployee = async (id, surname, lastname, identityNumber, email, birthdate, image, phone, gender, status) => {
    const sql = `
        INSERT INTO EMPLOYEE (id, surname, lastname, identityNumber, email, birthdate, [image], phone, gender, created_at, [status])
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;
    let [results] = await connection.query(sql, [id, surname, lastname, identityNumber, email, birthdate, image, phone, gender, status]);
    return results.insertId;
};

// Cập nhật thông tin nhân viên
const updateEmployee = async (id, surname, lastname, identityNumber, email, birthdate, image, phone, gender, status) => {
    const sql = `
        UPDATE EMPLOYEE
        SET surname = ?, lastname = ?, identityNumber = ?, email = ?, birthdate = ?, [image] = ?, phone = ?, gender = ?, [status] = ?, created_at = NOW()
        WHERE id = ?
    `;
    let [results] = await connection.query(sql, [surname, lastname, identityNumber, email, birthdate, image, phone, gender, status, id]);
    return results.affectedRows;
};

// Xóa nhân viên theo ID
const deleteEmployee = async (id) => {
    let [results] = await connection.query('DELETE FROM EMPLOYEE WHERE id = ?', [id]);
    return results.affectedRows;
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
