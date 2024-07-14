const router = require('express').Router();

// GET /api/notes - Read all notes
router.get('/notes', (req, res) => {
  try {
    const notes = readAndParseFile();
    res.json(notes);
  } catch (err) {
    console.error('Error reading notes:', err);
    res.status(500).json({ error: 'Failed to read notes' });
  }
});

// POST /api/notes - Create a new note
router.post('/notes', (req, res) => {
  try {
    const { title, text } = req.body;

    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required' });
    }

    const newNote = { title, text, id: Date.now().toString() };
    const notes = readAndParseFile();
    notes.push(newNote);
    writeToDBFile(notes);

    res.json(newNote);
  } catch (err) {
    console.error('Error saving note:', err);
    res.status(500).json({ error: 'Failed to save note' });
  }
});

// DELETE /api/notes/:id - Delete a note by id
router.delete('/notes/:id', (req, res) => {
  try {
    const noteId = req.params.id;
    let notes = readAndParseFile();
    notes = notes.filter((note) => note.id !== noteId);
    writeToDBFile(notes);

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
