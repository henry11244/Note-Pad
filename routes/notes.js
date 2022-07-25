const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../develop/helpers/fsUtils');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
    readFromFile('./develop/db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific tip
notes.get('/:note_id', (req, res) => {
    const tipId = req.params.tip_id;
    readFromFile('./develop/db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => notes.Note_id !== noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No notes with that ID');
        });
});

// DELETE Route for a specific tip
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.Note_id;
    readFromFile('./develop/db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all tips except the one with the ID provided in the URL
            const result = json.filter((note) => notes.Note_id !== noteId);

            // Save that array to the filesystem
            writeToFile('./develop/db/db.json', result);

            // Respond to the DELETE request
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text, Note_id } = req.body;

    if (req.body) {
        const newNotes = {
            title,
            text,
            Note_id: uuidv4(),
        };

        readAndAppend(newNotes, './develop/db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding notes');
    }
});

module.exports = notes;
