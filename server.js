const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
// const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

// sends to default directory
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/develop/public/index.html'))
);

// sends to default directory
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/develop/public/notes.html'))
);

const notes = require('express').Router();
// const { readFromFile, readAndAppend } = require('./helpers/fsUtils.js');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
    console.log(req.body);

    const { username, topic, tip } = req.body;

    if (req.body) {
        const newTip = {
            username,
            tip,
            topic,
            tip_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);

module.exports = notes;

