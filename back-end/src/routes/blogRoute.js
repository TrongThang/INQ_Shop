const express = require('express')

const { postCreateBlogAPI, putUpdateBlogAPI, getAllOrOneBlogAPI ,getAllOrOneBlogAPI_user} = require('../controllers/api/BlogController')

const routerBlog = express.Router();

routerBlog.get('/admin', getAllOrOneBlogAPI);

routerBlog.get('/', getAllOrOneBlogAPI_user);
// router.get('/', getBlogAPI);
// router.get('/', getAllBlogAPI);
routerBlog.post('/', postCreateBlogAPI)
routerBlog.put('/', putUpdateBlogAPI)



module.exports = routerBlog;