const express = require('express');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/videoController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', addFavorite);
router.delete('/remove', removeFavorite);
router.get('/favorites/:id', getFavorites);

module.exports = router;
