//const path = require('path');
const express = require('express');

const configViewEngine = (app) => {
    //app.set('views', './src/views');
    //app.set('view engine', 'ejs');

    app.use(express.static('./src/public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended : true }));
}

module.exports = configViewEngine;