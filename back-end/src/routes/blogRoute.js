const express = require('express')


const { postCreateBlogAPI, putUpdateBlogAPI, getAllOrOneBlogAPI ,getAllOrOneBlogAPI_user,getBlogAPI,getBlogAPI_Admin,putUpdateStatusBlogAPI,getAllBlogAPI} = require('../controllers/api/BlogController')

const routerBlog = express.Router();


routerBlog.get('/admin', getAllOrOneBlogAPI);
routerBlog.get('/', getAllOrOneBlogAPI_user);
routerBlog.get('/:id', getBlogAPI);
// router.get('/aa/aa', getAllBlogAPI);
routerBlog.post('/', postCreateBlogAPI);
routerBlog.put('/:id', putUpdateBlogAPI);

routerBlog.put('/:id/status', putUpdateStatusBlogAPI);
routerBlog.get('/admin/:id', getBlogAPI_Admin);



module.exports = routerBlog;