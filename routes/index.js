const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const { signinValidate, signupValidate } = require('../middlewares/validation');

router.post('/signin', signinValidate, login);

router.post('/signup', signupValidate, createUser);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(` Страница по указанному маршруту ${req.path} не найдена.`));
});

module.exports = router;
