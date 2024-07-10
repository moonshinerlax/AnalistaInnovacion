const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authroutes = require('./routes/authroutes');
const videoroutes = require('./routes/videoroutes');
const { checkAuth } = require('./middleware/authmiddleware');
// require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: 'http://localhost:4200', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
  credentials: true, // Allow cookies to be sent with requests
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Conectar a MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Failed to connect to MongoDB', err);
// });

// Rutas
app.use('/api/auth', authroutes);
app.use('/api/videos', checkAuth, videoroutes);

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
