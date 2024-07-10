const express = require('express');
const { getVideos, addFavorite, removeFavorite, getFavorites } = require('../controllers/videoController');
const router = express.Router();

router.post('/add', addFavorite);
router.delete('/remove/:id', removeFavorite);
router.get('/favorites', getFavorites);

module.exports = router;
