const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../errors/NotAuthorizedError');

const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV !== 'production' ? 'supersecretstring' : '');

const auth = (req, res, next) => {
  const { token = null } = req.cookies;

  if (!token) {
    next(new NotAuthorizedError('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new NotAuthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
