const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const User = require('../models/user'); // Ensure you have a User model

let users = [];

exports.register = async (req, res) => {
  try {
    const { name, username, email, password, recaptchaToken } = req.body;

    const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=6LferQsqAAAAAIfhOUMy4RWaVx92yu2HRuRum8zp&response=${recaptchaToken}`);

    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ message: 'Invalid reCaptcha' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
      name,
      username,
      email,
      password: hashedPassword
    };

    // const user = new User({
    //   name,
    //   username,
    //   email,
    //   password: hashedPassword
    // });

    // await user.save();
    users.push(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.forgotPassword = async (req, res) => {
  // Implement forgot password logic
};
