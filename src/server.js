require('dotenv').config()  // gọi ra để sử dụng.
const ViewEngine = require('../src/config/ViewEngine')
const RoutesBlog = require('../src/routes/blog')
const RoutesContact = require('../src/routes/contact')
const RoutesCart = require('./routes/cart');
const express = require('express')
const app = express()
const port = 8080
//khai báo mysql
//học về dotenv => dùng để khai báo hằng số (VD: PORT, HOST_NAME) đặt ở trong file .env và tên phải viết hoa tất cả
//npm i dotenv  => cách gọi dùng "process.env."
// Middleware để parse dữ liệu JSON hoặc URL-encoded từ client
ViewEngine(app)

app.use('/', RoutesBlog)
app.use('/', RoutesContact)
app.use('/', RoutesCart)


app.listen(port, () => {
    console.log(`Run server ${port}`)   
})