const express = require('express');
const router = express.Router();

const forgotPasswordController = require('../controllers/forgot_password_controller');

router.get('/', forgotPasswordController.resetPassword);

module.exports = router;