const connection = require('../config/database');
const { convertToSlug } = require('../helpers/stringHelper');

const isCategory = async (idCate) => {
    let [results, fields] = await connection.query('SELECT COUNT(*) FROM Category WHERE id = ?', [idCate]);

    return results[0][0] >= 1;
}

// USER
const getAllCategory_User = async () => {
    let [results, fields] = await connection.query('SELECT * FROM Category WHERE status = 1');

    return results;
}

const getAllCategory_Admin = async () => {
    let [results, fields] = await connection.query('SELECT * FROM Category');

    return results;
}

const getCategoryById = async (id) => {
    let [results, fields] = await connection.query('SELECT * FROM Category WHERE id = ?', id);

    return results[0];
}

const getChildrenCategory = async (id) => {
    let [results, fields] = await connection.query('SELECT * FROM Category WHERE id = ?', id);
    
    return results[0];
}

const createCategory = async ({nameCategory, parenId, image, description, status}) => {
    let sql = `INSERT INTO 
                Category (nameCategory, slug , parenId, image, description, status) 
                VALUES(?, ?, ?, ?, ?, ?)`;
    const slug = convertToSlug(nameCategory);

    let [results, fields] = await connection.query(
        sql, [nameCategory, slug, parenId, image, description, status]
    );

    return results;
}

const updateCategory = async ({nameCategory, parenId, image, description, status}) => {
    let sql = `UPDATE Category 
                SET nameCategory = ?, slug = ?, parenId = ?, image = ?, description = ?, status = ?
                WHERE id = ?`;
    
    const slug = convertToSlug(nameCategory);
    
    let [results, fields] = await connection.query(
        sql, [nameCategory, slug, parenId, image, description, status]
    );

    return results;
}

const deleteCategory = async ({id, status}) => {
    let sql = `UPDATE Category 
                SET status = ?
                WHERE id = ?`;
    
    const slug = convertToSlug(nameCategory);
    
    let [results, fields] = await connection.query(
        sql, [status, id]
    );

    return results;
}

module.exports = {
    getCategoryById, createCategory
}