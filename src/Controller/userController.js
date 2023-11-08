const User = require('../Model/user.js');
const bcrypt = require( 'bcryptjs');
const { log } = require('console');
const jwt = require('jsonwebtoken');
const enviarMail = require('../services/mailer.js');



exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.create = async (req, res) => {

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({ error: 'User not found' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).send({ error: 'Incorrect password' });
  }

  const token = jwt.sign({ _id: user._id, userRole: user.role, email: user.email }, process.env.JWT_SECRET);

  res.status(200)
    .header('Authorization', `${token}`)
    .json( "login success!!" );
};
exports.delete = async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not Found' });
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    user.email = req.body.email;
    user.name = req.body.name;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  res.status(200).clearCookie('token').json({ message: 'Logged out' });
  //res.redirect('/');
}


exports.sendMail = async (req, res) => {

  const { name, email, message } = req.body;
  
  try {
    await enviarMail(name, email, message);
    console.log(message);
    res.status(200).json({ message: 'Mail sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error sending mail' });
  }

};