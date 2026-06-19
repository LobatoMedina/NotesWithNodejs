const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

// Enviar cookie con el token
const sendTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 día
    sameSite: 'lax',
    // secure: true, // habilitar en producción con HTTPS
  });
};

// GET /signup
const getSignup = (req, res) => {
  res.render('signup', { error: null });
};

// POST /signup
const postSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.render('signup', { error: 'Todos los campos son obligatorios' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.render('signup', { error: 'El usuario o email ya está registrado' });
    }

    const user = await User.create({ username, email, password });

    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    res.redirect('/notes');
  } catch (error) {
    console.error(error);
    res.render('signup', { error: 'Ocurrió un error al registrar el usuario' });
  }
};

// GET /login
const getLogin = (req, res) => {
  res.render('login', { error: null });
};

// POST /login
const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', { error: 'Email y contraseña son obligatorios' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.render('login', { error: 'Credenciales inválidas' });
    }

    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    res.redirect('/notes');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'Ocurrió un error al iniciar sesión' });
  }
};

// GET /logout
const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

module.exports = { getSignup, postSignup, getLogin, postLogin, logout };
