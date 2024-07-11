const { MongoClient } = require('mongodb');


const uri = process.env.MONGO_URI;
console.log(uri)

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
