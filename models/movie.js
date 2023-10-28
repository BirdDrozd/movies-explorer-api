const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "country" - 2'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "director" - 2'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: validator.isURL,
      message: 'Неправильный URL постера',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailerLink" должно быть заполнено'],
    validate: {
      validator: validator.isURL,
      message: 'Неправильный URL трейлера',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: validator.isURL,
      message: 'Неправильный URL изображения',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле "owner" должно быть заполнено'],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "nameRU" - 2'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "nameEN" - 2'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
