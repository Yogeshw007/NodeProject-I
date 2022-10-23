const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user_controller');
const User = require('../models/user');

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);
router.get('/profile', usersController.profile);
router.get('/sign-out', usersController.signOut);

module.exports = router;