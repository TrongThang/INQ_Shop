const express = require('express');
const {
    getAllSlidesAPI,
    getSlideByIdAPI,
    createSlideAPI,
    updateSlideAPI,
    hideSlideAPI
} = require('../controllers/api/SlideShowController');
const routerSlideShow = express.Router();


routerSlideShow.get('/', getAllSlidesAPI);  //
routerSlideShow.get('/:id', getSlideByIdAPI); //

routerSlideShow.post('/', createSlideAPI);    //
routerSlideShow.put('/:id', updateSlideAPI);   //
routerSlideShow.delete('/:id', hideSlideAPI);   //


module.exports = routerSlideShow;