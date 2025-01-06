const express = require('express')

const { getAllBlogAPI, getBlogAPI, postCreateBlogAPI, putUpdateBlogAPI, getAllOrOneBlogAPI, putUpdateStatusBlogAPI } = require('../controllers/api/BlogController')

const routerBlog = express.Router();

// routerBlog.get('/', getAllOrOneBlogAPI);
routerBlog.get('/', getAllBlogAPI);
routerBlog.get('/:id', getBlogAPI);
routerBlog.post('/', postCreateBlogAPI);
routerBlog.put('/', putUpdateBlogAPI);
routerBlog.put('/:id', putUpdateStatusBlogAPI);



module.exports = routerBlog;