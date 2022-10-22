const express = require('express');
const router = express.Router();

const usersController = require('../Controllers/user_controller');

router.get('/profile', usersController.profile);

module.exports = router;