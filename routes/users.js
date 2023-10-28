const router = require('express').Router();
const { updateProfileValidate } = require('../middlewares/validation');

const {
  updateProfile, getUserInfo, logOut,
} = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch('/me', updateProfileValidate, updateProfile);

router.delete('/logout', logOut);

module.exports = router;
