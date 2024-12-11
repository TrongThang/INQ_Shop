const express = require('express');
const configViewEngine = require('./config/viewEngine');
const routerCategory = require('./routes/categoryRoute');
const cartRouter = require('./routes/cartRoute');
const connection = require('./config/database');

const app = express();
const port = 8081;

configViewEngine(app);


app.use('/v1/api/category', routerCategory);
app.use('/v1/api/cart', cartRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});