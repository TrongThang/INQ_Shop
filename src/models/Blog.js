//Thông tin về bài viết của 1 DANH MỤC nào đó
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('INQ_SHOP', 'username', 'password', {
    host: 'localhost',
    dialect: 'mssql', // Assuming you're using MSSQL
})

const Blog = sequelize.define('Blog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: { model: Category, key: id },
        validate: {
            isInt: true,
            notNull: { msg: "*Danh Mục là bắt buộc" },
        },
    },
    title: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
            notNull: { msg: "*Tiêu đề là bắt buộc" },
            len: {
                args: [1, 500],
                msg: "Tiêu đề phải từ 1 đến 500 ký tự.",
            },
        },
    },
    author: {
        type: DataTypes.STRING(12),
        allowNull: false,
        references: { model: Employee, key: id },
        validate: {
            notNull: { msg: "Tên tác giả là bắt buộc" },
        },
    },
    content: { type: DataTypes.TEXT},
    contentNormal: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING(500) },
    view_point: { type: DataTypes.INTEGER },
    score: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
    hide_at: { type: DataTypes.DATE },
    status: { type: DataTypes.TINYINT },
});

module.exports = {
    Blog
}