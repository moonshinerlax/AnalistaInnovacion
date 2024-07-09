const express = require('express');
const { getVideos, addFavorite, removeFavorite, getFavorites } = require('../controllers/videoController');
const router = express.Router();

router.get('/', getVideos);
router.post('/favorites', addFavorite);
router.delete('/favorites/:id', removeFavorite);
router.get('/favorites', getFavorites);

module.exports = router;
