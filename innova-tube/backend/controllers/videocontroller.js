let favorites = [];

exports.getVideos = async (req, res) => {
  // Implementar lógica para obtener videos de YouTube
};

exports.addFavorite = async (req, res) => {
  const { userId, videoId } = req.body;
  try {
    const { videoId, title, thumbnail } = req.body;

    const favorite = { userId, videoId, title, thumbnail, id: favorites.length + 1 };
    favorites.push(favorite);

    res.status(201).json({ message: 'Video added to favorites', favorite });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.removeFavorite = async (req, res) => {
  const { userId, videoId } = req.params;
  try {
    const favoriteId = parseInt(req.params.id);
    favorites = favorites.filter(fav => fav.id !== favoriteId);

    res.status(200).json({ message: 'Video removed from favorites' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getFavorites = async (req, res) => {
  const { userId } = req.query;
  try {
    const userFavorites = favorites.filter(fav => fav.userId === userId);

    res.status(200).json(userFavorites);
  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
