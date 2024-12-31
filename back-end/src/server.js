const express = require('express');
require('dotenv').config()  // gọi ra để sử dụng.
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');
const app = express();
const port = 8081;
configViewEngine(app)

const routerCustomer = require('./routes/customerApi');
const routerEmployee = require('./routes/employeeApi');
const routerAccount = require('./routes/accountApi');
const routerSlideShow = require('./routes/slideShowApi');

const routerCategory = require('./routes/categoryRoute');
const cartRouter = require('./routes/cartRoute');
const routerAddressBook = require('./routes/addressBookAPI');
const routerLikeDevice = require('./routes/likedDeviceAPI');

const routerBlog = require('./routes/blogRoute')
const routerContact = require('./routes/contactRouter')
const routerCart = require('./routes/cartRoute');

const routerDevice = require('./routes/deviceRoute');

const routeAPI = require('./routes/routeAPI');
//app.use('/v1/api', routeAPI);
app.use('/v1/api/device', routerDevice)

app.use('/v1/api/blog', routerBlog)
app.use('/v1/api/contact', routerContact)
app.use('/v1/api/cart', routerCart)

app.use('/v1/api/customer', routerCustomer);
app.use('/v1/api/employee', routerEmployee);
app.use('/v1/api/account', routerAccount);
app.use('/v1/api/slideshow', routerSlideShow);

app.use('/v1/api/category', routerCategory);
app.use('/v1/api/cartCookie', cartRouter);
app.use('/v1/api/addressBook/', routerAddressBook);
app.use('/v1/api/likedDevice/', routerLikeDevice);


app.listen(port, () => {
    console.log(`Run server ${port}`)   
})