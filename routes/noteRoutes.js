const express = require('express');
const router = express.Router();
const { getNotes, getNewNoteForm, createNote } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getNotes);
router.get('/new', protect, getNewNoteForm);
router.post('/', protect, createNote);

module.exports = router;
