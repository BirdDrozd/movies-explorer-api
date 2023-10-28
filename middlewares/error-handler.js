const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
  next();
};

module.exports = errorHandler;
