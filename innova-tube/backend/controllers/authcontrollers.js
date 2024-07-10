const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const axios = require('axios');
// const User = require('../models/user'); // Ensure you have a User model
// const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');

let users = [];

exports.register = async (req, res) => {
  try {
    const { name, username, email, password, recaptchaToken } = req.body;

    // async function createAssessment({
    //   projectID = "6LcTvgsqAAAAAIrebSy2Y7Q0jtF3b_Twlb_ZiqX9",
    //   recaptchaKey = "6LcTvgsqAAAAAIrebSy2Y7Q0jtF3b_Twlb_ZiqX9",
    //   token = recaptchaToken,
    //   recaptchaAction = "SIGNUP",
    // }) {

    //   const client = new RecaptchaEnterpriseServiceClient();
    //   const projectPath = client.projectPath(projectID);
    //   console.log(projectPath)

    //   const request = ({
    //     assessment: {
    //       event: {
    //         token: token,
    //         siteKey: recaptchaKey,
    //       },
    //     },
    //     parent: projectPath,
    //   });

    //   const [ response ] = await client.createAssessment(request);
    //   client.close()

    //   if (!response.tokenProperties.valid) {
    //     console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
    //     return null;
    //   }

    //   if (response.tokenProperties.action === recaptchaAction) {
    //     console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
    //     response.riskAnalysis.reasons.forEach((reason) => {
    //       console.log(reason);
    //     });

    //     return response.riskAnalysis.score;

    //   } else {
    //     console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
    //     return null;
    //   }
    // }

    // const recaptchaScore = await createAssessment({
    //   projectID: "6LcTvgsqAAAAAIrebSy2Y7Q0jtF3b_Twlb_ZiqX9",
    //   recaptchaKey: "6LcTvgsqAAAAAIrebSy2Y7Q0jtF3b_Twlb_ZiqX9",
    //   token: recaptchaToken,
    //   recaptchaAction: "signup",
    // });

    // if (recaptchaScore === null || recaptchaScore < 0.5) {
    //   return res.status(400).json({ message: 'reCAPTCHA verification failed' });
    // }

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
    res.status(201).json({ message: 'User registered successfully, ' });

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
