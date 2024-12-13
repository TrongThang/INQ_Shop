const express = require('express')
const router = express.Router();

const {getAllBlogAPI, getBlogAPI, postCreateBlogAPI, putUpdateBlogAPI, getAllOrOneBlogAPI } = require('../controllers/api/BlogController')

router.get('/', getAllOrOneBlogAPI);
// router.get('/', getBlogAPI);
router.post('', postCreateBlogAPI)
router.put('', putUpdateBlogAPI)



module.exports = router