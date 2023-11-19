const router = require('express').Router();
const { deleteMovieValidate, createMovieValidate } = require('../middlewares/validation');
const {
  deleteMovie, createMovie, getSavedMovies,
} = require('../controllers/movies');

router.get('/', getSavedMovies);

router.get('/movies', getMovies);

router.post('/', createMovieValidate, createMovie);

router.delete('/:movieId', deleteMovieValidate, deleteMovie);

module.exports = router;
