const express = require('express');
const router = express.Router();
const {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  logout,
} = require('../controllers/authController');
const { redirectIfAuthenticated } = require('../middleware/authMiddleware');

router.get('/signup', redirectIfAuthenticated, getSignup);
router.post('/signup', redirectIfAuthenticated, postSignup);

router.get('/login', redirectIfAuthenticated, getLogin);
router.post('/login', redirectIfAuthenticated, postLogin);

router.get('/logout', logout);

module.exports = router;
