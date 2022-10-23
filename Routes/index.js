const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
// const usersController = require('../Controllers/user_controller');

router.get('/', homeController.home);

//Path that starts with /users should
router.use('/users', require('./users'));

module.exports = router;