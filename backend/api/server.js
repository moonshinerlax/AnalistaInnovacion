require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authroutes = require('./routes/authroutes');
const videoroutes = require('./routes/videoroutes');
const { connectDB } = require('./db');


const app = express();

app.use(express.static(path.join(__dirname, 'dist/innova-tube')));

prerenderedRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/innova-tube', 'index.html'));
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/innova-tube/index.html'));
});
const port = process.env.PORT || 3000;
connectDB();

const corsOptions = {
  origin: 'https://innova-tube-livid.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://innova-tube-livid.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/api/auth', authroutes);
app.use('/api/videos', videoroutes);

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
