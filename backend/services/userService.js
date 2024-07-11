const { getDB } = require('../db');

const findUserByEmail = async (email) => {
  const db = getDB();
  return await db.collection('users').findOne({ email });
};

const findUserByUsername = async (username) => {
  const db = getDB();
  return await db.collection('users').findOne({ username });
};

module.exports = {
  findUserByEmail,
  findUserByUsername,
};
