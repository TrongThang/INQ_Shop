const express = require('express');
const configViewEngine = require('./config/viewEngine');
const routerAddressBook = require('./routes/addressBookAPI');
const routerLikeDevice = require('./routes/likedDeviceAPI');
const connection = require('./config/database');

const app = express();
const port = 8081;

configViewEngine(app);


app.use('/v1/api/addressBook/', routerAddressBook);
app.use('/v1/api/likedDevice/', routerLikeDevice);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});