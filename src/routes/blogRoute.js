const express = require('express')

const { postCreateBlogAPI, putUpdateBlogAPI, getAllOrOneBlogAPI } = require('../controllers/api/BlogController')

const routerBlog = express.Router();

routerBlog.get('/', getAllOrOneBlogAPI);
// router.get('/', getBlogAPI);
// router.get('/', getAllBlogAPI);
routerBlog.post('/', postCreateBlogAPI)
routerBlog.put('/', putUpdateBlogAPI)



module.exports = routerBlog;