const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const {
  OK_CODE, CREATED, SALT_ROUNDS,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  return User.findById({ _id: req.user.id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      } else {
        res.status(OK_CODE).send(user);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((createdUser) => {
      res.status(CREATED).send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('При регистрации пользователя произошла ошибка.'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotAuthorizedError('Вы ввели неправильный логин или пароль.'));
      }
      return bcrypt.compare(password, user.password)
        .then((isPasswordMatch) => {
          if (!isPasswordMatch) {
            return Promise.reject(new NotAuthorizedError('Вы ввели неправильный логин или пароль.'));
          }
          const token = jwt.sign({ id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '1w' });
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          });
          return res.status(OK_CODE).send({ token });
        });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    req.user.id,
    { email, name },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      } else {
        res.status(OK_CODE).send(user);
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('При обновлении профиля произошла ошибка.'));
      } else {
        next(err);
      }
    });
};

const logOut = (req, res) => {
  res.status(OK_CODE)
    .clearCookie('jwt', {
      sameSite: 'none',
      secure: true,
    })
    .send({ message: 'Успешный выход из системы' });
};

module.exports = {
  createUser,
  updateProfile,
  login,
  logOut,
  getUserInfo,
};
