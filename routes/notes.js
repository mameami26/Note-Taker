const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => {
      res.json(JSON.parse(data))
    })
    .catch((err) => res.status(500).json({ error: 'Error reading notes' }));
});

// GET Route for a specific note
notes.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.find((note) => note.id === noteId);
      return result ? res.json(result) : res.status(404).json('No note with that ID');
    })
    .catch((err) => res.status(500).json({ error: 'Error reading note' }));
});

// // DELETE Route for a specific note
// notes.delete('/:note_id', (req, res) => {
//   const noteId = req.params.note_id;
//   readFromFile('./db/notes.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((note) => note.id !== noteId);
//       writeToFile('./db/notes.json', result);
//       res.json(`Note ${noteId} has been deleted 🗑️`);
//     })
//     .catch((err) => res.status(500).json({ error: 'Error deleting note' }));
// });

// // POST Route for a new note
// notes.post('/', (req, res) => {
//   const { title, text } = req.body;

//   if (title && text) {
//     const newNote = {
//       title,
//       text,
//       id: uuidv4(),
//     };

//     readFromFile('./db/notes.json')
//       .then((data) => {
//         const notes = JSON.parse(data);
//         notes.push(newNote);
//         return writeToFile('./db/notes.json', notes);
//       })
//       .then(() => res.json(newNote))
//       .catch((err) => res.status(500).json({ error: 'Error adding note' }));
//   } else {
//     res.status(400).json('Error: Note must have a title and text');
//   }
// });

module.exports = notes;
