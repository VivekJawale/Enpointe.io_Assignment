const authController = require('../controllers/auth.controller');
const express = require('express')
const router = express.Router()

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/banker-login', authController.bankerLogin)

module.exports = router;