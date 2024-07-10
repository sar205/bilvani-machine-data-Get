const bcrypt = require('bcrypt');
const Signup = require('../../mongodb/signupController/signupController');

const signup = async (req, res) => {
  try {
    const { email, name, password, phone } = req.body;

    const existingEmailSignup = await Signup.findOne({ email });
    if (existingEmailSignup) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const existingPhoneSignup = await Signup.findOne({ phone });
    if (existingPhoneSignup) {
      return res.status(400).json({ error: 'Phone number is already in use' });
    }

    if (phone.length !== 10) {
      return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Increase the my strong of bcrypt rounds
    const saltRounds = 12; 

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newSignup = new Signup({
      email,
      name,
      password: hashedPassword,
      phone
    });

    const savedSignup = await newSignup.save();

    res.status(201).json(savedSignup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signup };
