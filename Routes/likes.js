const express = require('express');
const router = express.Router();
const likesController = require('../controllers/like_controller');

router.post('/toggle', likesController.toggleLikes);

module.exports = router;