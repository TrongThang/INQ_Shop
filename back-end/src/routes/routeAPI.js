const express = require('express');
const router = express.Router();

const routerCustomer = require('./customerApi');
const routerEmployee = require('./employeeApi');
const routerAccount = require('./accountApi');
const routerSlideShow = require('./slideShowApi');

const routerCategory = require('./categoryRoute');
const cartRouter = require('./cartRoute');
const routerAddressBook = require('./addressBookAPI');
const routerLikeDevice = require('./likedDeviceAPI');

const routerBlog = require('./blogRoute')

const routerContact = require('./contactRoute')

const routerAttributeGroup= require('./attributegroupRoute')

const routerCart = require('./cartRoute');

const routerDevice = require('./deviceRoute');



router.use('/device', routerDevice);
router.use('/blog', routerBlog);
router.use('/contact', routerContact);
router.use('/cart', routerCart);
router.use('/customer', routerCustomer);
router.use('/employee', routerEmployee);
router.use('/account', routerAccount);
router.use('/slideshow', routerSlideShow);
router.use('/category', routerCategory);
router.use('/cartCookie', cartRouter);
router.use('/addressBook', routerAddressBook);
router.use('/likedDevice', routerLikeDevice);

router.use('/attributeGroup', routerAttributeGroup);




module.exports = router;