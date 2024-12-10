const connection = require('../config/database');

const getAllUsers = async () => {
    let [results, fields] = await connection.query('SELECT * FROM Users');

    return results;
}

const getUserById = async (id) => {
    let [results, fields] = await connection.query('SELECT * FROM Users WHERE id = ?', id);
    
    return results[0];
}

const createUser = async (name, email, city) => {
    let sql = `INSERT INTO 
                Users (name, email, city) 
                VALUES(?, ?, ?)`;
    
    let [results, fields] = await connection.query(
        sql, [name, email, city]
    );

    return results.insertId;
}

module.exports = {
    getAllUsers, getUserById, createUser
}