const connection = require('../config/database');
const { convertToSlug } = require('../helpers/stringHelper');

const isDevice = async (id) => {
    let [results, fields] = await connection.query('SELECT COUNT(*) FROM Device WHERE id = ?');

    return results[0][0] >= 1;
}

// USER
const getAllDevice_User = async () => {
    let [results, fields] = await connection.query('SELECT * FROM Device WHERE status = 1');

    return results;
}

const getAllDevice_Admin = async () => {
    let [results, fields] = await connection.query('SELECT * FROM Device');

    return results;
}

const getDeviceById = async (id) => {
    let [results, fields] = await connection.query('SELECT * FROM Device WHERE id = ?', id);

    return results[0];
}

const getChildrenDevice = async (id) => {
    let [results, fields] = await connection.query('SELECT * FROM Device WHERE id = ?', id);
    
    return results[0];
}

const createDevice = async ({nameDevice, parenId, image, description, status}) => {
    let sql = `INSERT INTO 
                Device (nameDevice, slug , parenId, image, description, status) 
                VALUES(?, ?, ?, ?, ?, ?)`;
    const slug = convertToSlug(nameDevice);

    let [results, fields] = await connection.query(
        sql, [nameDevice, slug, parenId, image, description, status]
    );

    return results;
}

const updateDevice = async ({nameDevice, parenId, image, description, status}) => {
    let sql = `UPDATE Device 
                SET nameDevice = ?, slug = ?, parenId = ?, image = ?, description = ?, status = ?
                WHERE id = ?`;
    
    const slug = convertToSlug(nameDevice);
    
    let [results, fields] = await connection.query(
        sql, [nameDevice, slug, parenId, image, description, status]
    );

    return results;
}

const deleteDevice = async ({id, status}) => {
    let sql = `UPDATE Device 
                SET status = ?
                WHERE id = ?`;
    
    const slug = convertToSlug(nameDevice);
    
    let [results, fields] = await connection.query(
        sql, [status, id]
    );

    return results;
}

module.exports = {
    getDeviceById, createDevice
}