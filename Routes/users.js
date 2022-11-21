const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');

//passport.checkAuthentication if returns true then only the page gets rendered
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);
router.get('/delete/avatar/:email', usersController.deleteAvatar);

// Use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', // passport strategy
    { failureRedirect: '/users/sign-in' }, // if failes to authenticate then path user needs to land on
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), usersController.createSession);


router.get('/forgot-password', usersController.forgotPassword);
router.post('/generate-forgot-password', usersController.generateForgotPassword);

router.post('/update-password', usersController.resetPassword);

module.exports = router;