const express = require('express');
const app = express();
const port = 8081;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
const connection = require('./config/database');

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