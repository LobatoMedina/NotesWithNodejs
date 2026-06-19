const Note = require('../models/Note');

// GET /notes -> Lista de notas del usuario autenticado
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.render('notes', { notes, error: null });
  } catch (error) {
    console.error(error);
    res.render('notes', { notes: [], error: 'No se pudieron cargar las notas' });
  }
};

// GET /notes/new -> Formulario para crear nota
const getNewNoteForm = (req, res) => {
  res.render('newNote', { error: null });
};

// POST /notes -> Crear una nueva nota
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.render('newNote', { error: 'El título y el contenido son obligatorios' });
    }

    await Note.create({
      title,
      content,
      user: req.user._id,
    });

    res.redirect('/notes');
  } catch (error) {
    console.error(error);
    res.render('newNote', { error: 'Ocurrió un error al crear la nota' });
  }
};

module.exports = { getNotes, getNewNoteForm, createNote };
