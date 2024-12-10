const express = require('express');
const configViewEngine = require('./config/viewEngine');
const routerCategory = require('./routes/api');
const connection = require('./config/database');

const app = express();
const port = 8081;

configViewEngine(app);


app.use('/v1/api/', routerCategory);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});