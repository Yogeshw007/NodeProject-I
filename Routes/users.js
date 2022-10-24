const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');

router.get('/profile', usersController.profile);
router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);

router.post('/create', usersController.create);

// Use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', // passport strategy
    { failureRedirect: '/users/sign-in' }, // if failes to authenticate then path user needs to land on
), usersController.createSession);

module.exports = router;