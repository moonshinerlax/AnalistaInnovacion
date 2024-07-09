const express = require('express');
const { register, login, forgotPassword } = require('../controllers/authcontrollers');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

module.exports = router;
