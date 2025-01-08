//const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const session = require('express-session');
const configViewEngine = (app) => {
    //app.set('views', './src/views');
    //app.set('view engine', 'ejs');

    app.use(express.static('./src/public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(cors());
    app.use(session({
        secret: 'ddc5b6c8f8a7e3e3c4b5e6d7c8a9f1f2e3c4a5b6e7c8a9f0f1a2b3c4d5e6f7g8', // Thay bằng chuỗi bí mật của bạn
        resave: false,             // Không lưu lại session nếu không thay đổi
        saveUninitialized: true,   // Lưu session ngay cả khi chưa được khởi tạo
        cookie: { secure: false }  // Đặt `true` nếu sử dụng HTTPS
      }));
}

module.exports = configViewEngine;