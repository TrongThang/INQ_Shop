const { convertToSlug } = require('../helpers/stringHelper');
const Category = require('../models/Category');

const isCategory = async (idCate) => {
    let [results, fields] = await connection.query('SELECT COUNT(*) FROM Category WHERE id = ?', [idCate]);

    return results[0][0] >= 1;
}

// USER
const getAllCategory_User = async () => {
    const data = await Category.findAll({
        where: { status: 1},
    });

    return await data;
}

const getAllCategory_Admin = async () => {
    const data = await Category.findAll();

    return await data;
}

const getCategoryById = async (id) => {
    return await Category.findByPK(id);
}

const getChildrenCategory = async (id) => {
    return await Category.findAll({
        where: { parenId },
    });
}

const createCategory = async ({nameCategory, parenId, image, description, status}) => {
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
    getAllCategory_User, getAllCategory_Admin, getCategoryById,
}