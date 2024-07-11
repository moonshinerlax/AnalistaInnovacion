require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authroutes = require('./routes/authroutes');
const videoroutes = require('./routes/videoroutes');
const { connectDB } = require('./db');


const app = express();
const port = process.env.PORT || 3000;
connectDB();

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
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

app.use('/api/auth', authroutes);
app.use('/api/videos', videoroutes);

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
