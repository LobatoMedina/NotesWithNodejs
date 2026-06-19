const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware: protege rutas que requieren sesión iniciada
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect('/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.clearCookie('token');
      return res.redirect('/login');
    }

    req.user = user;
    res.locals.user = user; // disponible en las vistas EJS
    next();
  } catch (error) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};

// Middleware: evita que un usuario logueado vea login/signup de nuevo
const redirectIfAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) return res.redirect('/notes');
    next();
  } catch (error) {
    next();
  }
};

module.exports = { protect, redirectIfAuthenticated };
