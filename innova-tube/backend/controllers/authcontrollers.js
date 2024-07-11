const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getDB } = require('../db');
// const axios = require('axios');
const User = require('../models/user'); // Ensure you have a User model
// const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');

exports.register = async (req, res) => {
  try {
    const { name, username, email, password, recaptchaToken } = req.body;

    const db = getDB();

    // Verificar si el usuario ya existe
    let user = await db.collection('users').findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = {
      name,
      username,
      email,
      password: hashedPassword
    };

    await db.collection('users').insertOne(user);
    res.status(201).json({ message: 'User registered successfully, ' });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDB();
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not registered' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.email }, 'JustTesting', { expiresIn: '24h' });

    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.forgotPassword = async (req, res) => {
  // Implement forgot password logic
};
