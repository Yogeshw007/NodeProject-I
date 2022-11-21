const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const { route } = require('./users');
// const usersController = require('../controllers/user_controller');

router.get('/', homeController.home);

//Path that starts with /users should
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/reset-password', require('./reset_password'));

router.use('/api', require('./api'));

module.exports = router;