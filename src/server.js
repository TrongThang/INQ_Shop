const express = require('express');
const configViewEngine = require('./config/viewEngine');
const routerCategory = require('./routes/api');
const connection = require('./config/database');
const routerCustomer = require('./routes/customerApi');
const routerEmployee = require('./routes/employeeApi');
const routerAccount = require('./routes/accountApi');

const app = express();
const port = 8081;

configViewEngine(app);


app.use('/v1/api/', routerCustomer);
app.use('/v2/api/', routerEmployee);
app.use('/v3/api/', routerAccount);




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});