const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../utils/constants');

const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateProfileValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const deleteMovieValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

const createMovieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(urlPattern).required(),
    trailerLink: Joi.string().pattern(urlPattern).required(),
    thumbnail: Joi.string().pattern(urlPattern).required(),
    owner: Joi.string().length(24).hex(),
    movieId: Joi.number().unsafe().required(),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
});

module.exports = {
  signinValidate,
  signupValidate,
  updateProfileValidate,
  deleteMovieValidate,
  createMovieValidate,
};
