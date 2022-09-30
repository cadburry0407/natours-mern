const express = require('express');
const authController = require('../controllers/authController');
// const tourController = require('../controllers/tourController');

const router = express.Router();

// router.route('/:slug').get(tourController.getTourViaSlug);
// router.route('/').get(authController.isLoggedIn);
router.route('/login').get(authController.login);

module.exports = router;
