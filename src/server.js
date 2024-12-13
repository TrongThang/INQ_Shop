const express = require('express');
require('dotenv').config()  // gọi ra để sử dụng.
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');

const routerCustomer = require('./routes/customerApi');
const routerEmployee = require('./routes/employeeApi');
const routerAccount = require('./routes/accountApi');
const routerSlideShow = require('./routes/slideShowApi');

const routerCategory = require('./routes/categoryRoute');
const cartRouter = require('./routes/cartRoute');
const routerAddressBook = require('./routes/addressBookAPI');
const routerLikeDevice = require('./routes/likedDeviceAPI');

const RoutesBlog = require('../src/routes/blog')
const RoutesContact = require('../src/routes/contact')
const RoutesCart = require('./routes/cart');

app.use('/v1/api/blog', RoutesBlog)
app.use('/v1/api/contact', RoutesContact)
app.use('/v1/api/cartDatabase', RoutesCart)

app.use('/v1/api/category', routerCategory);
app.use('/v1/api/cartCookie', cartRouter);
app.use('/v1/api/addressBook/', routerAddressBook);
app.use('/v1/api/likedDevice/', routerLikeDevice);

app.use('/v1/api/customer', routerCustomer);
app.use('/v1/api/employee', routerEmployee);
app.use('/v1/api/account', routerAccount);
app.use('/v1/api/slideshow', routerSlideShow);

app.listen(port, () => {
    console.log(`Run server ${port}`)   
})