const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // gọi ra để sử dụng.
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');
const app = express();
const port = 8081;

configViewEngine(app);

const routeAPI = require('./routes/routeAPI');

app.use(express.json({ limit: '100mb' })); 
app.use(express.urlencoded({ limit: '100mb', extended: true })); 


app.use('/api', routeAPI);

app.listen(port, () => {
    console.log(`Run server ${port}`);
});