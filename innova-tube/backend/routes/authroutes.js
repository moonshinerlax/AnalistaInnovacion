const express = require('express');
const { register, login, forgotPassword } = require('../controllers/authcontrollers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/me', authMiddleware, (req, rest) => {
  rest.json(req.user)
})

module.exports = router;
