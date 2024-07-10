

const bcrypt = require('bcrypt');
const Login = require('../../mongodb/signupController/signupController');

const signinController = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    let user;

    if (email) {
      user = await Login.findOne({ email });
    } else if (phone) {
      user = await Login.findOne({ phone });
    } else {
      return res.status(400).json({ error: 'Email or phone number is required' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signinController };
