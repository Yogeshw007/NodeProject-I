const express = require('express');
const router = express.Router();
const homeController = require('../Controllers/home_controller');
const usersController = require('../');

console.log('router loaded')

router.get('/', homeController.home);
router.get('/contact', homeController.contact);

router.use('/users', require('./users'));


module.exports = router;