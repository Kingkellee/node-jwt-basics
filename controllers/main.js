const jwt = require('jsonwebtoken');

const { BadRequestError } = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError('Please provide a username and password');
  }

  const id = new Date().getDate();
  // jwt format jww.sign({payload: id, username}, jwt_secret, {options: expiresIn:?})
  // it is important to keep the payload small for better user experience
  // in production use long, complex unguessable string values for jwt_secret
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  res.status(200).json({ msg: 'User has been created', token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
