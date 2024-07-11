const { getDB } = require("../db");

let favorites = [];

exports.getVideos = async (req, res) => {

};

exports.addFavorite = async (req, res) => {
  try {
    const { userId, videoId, title, thumbnail } = req.body;

    const favorite = { userId, videoId, title, thumbnail, id: favorites.length + 1 };
    const db = getDB()

    let fav = await db.collection('favorites').findOne({ videoId })
    if (fav) {
      return res.status(400).json({ message: 'Video already a favorite' });
    }

    await db.collection('favorites').insertOne(favorite);

    res.status(201).json({ message: 'Video added to favorites', favorite });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.removeFavorite = async (req, res) => {
  const { userId, videoId } = req.query;
  try {

    const db = getDB();

    await db.collection('favorites').findOneAndDelete({ userId: userId, videoId: videoId });

    res.status(200).json({ message: 'Video removed from favorites' });
  } catch (error) {

    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getFavorites = async (req, res) => {
  const { id } = req.params;
  try {
    const db = getDB();

    const videosCursor = db.collection('favorites').find({ userId: id });
    const videos = await videosCursor.toArray();

    res.status(200).json({videos});
  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
