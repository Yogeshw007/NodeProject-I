const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/posts_controller');

// Create post router
// Passport authentication to check if user is logged in, if yes then it will render the create response
router.post('/create', passport.checkAuthentication, postController.create);

module.exports = router;