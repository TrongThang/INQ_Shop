const express = require('express');
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

const app = express();
const port = 8081;

configViewEngine(app);


app.use('/v1/api/category', routerCategory);
app.use('/v1/api/cart', cartRouter);
app.use('/v1/api/addressBook/', routerAddressBook);
app.use('/v1/api/likedDevice/', routerLikeDevice);

app.use('/v1/api/', routerCustomer);
app.use('/v1/api/', routerEmployee);
app.use('/v1/api/', routerAccount);
app.use('/v1/api/', routerSlideShow);






app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});