const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// helper
const checkAuth = require('../helpers/auth.js')

router.get('/login', AuthController.login);
router.post('/login', AuthController.loginPost);
router.get('/register', AuthController.register);
router.post('/register', AuthController.registerPost);
router.get('/logout', checkAuth ,AuthController.logout);

module.exports = router;