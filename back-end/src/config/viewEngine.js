//const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const session = require('express-session');
const cors = require('cors');

const configViewEngine = (app) => {
  //app.set('views', './src/views');
  //app.set('view engine', 'ejs');
  app.use(cors({
    origin: 'http://localhost:3000', // Đổi theo domain frontend của bạn
    credentials: true // Cho phép gửi cookies, session
  }));
  app.use(express.static('./src/public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session({
    secret: process.env.SECRET_KEY || 'H8z!nT1G6G$@Dbv9iQX@2hMnqR#0A2F',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Để false nếu dùng HTTP, true nếu dùng HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 ngày
      sameSite: 'lax'
    }
  }));

}

module.exports = configViewEngine;