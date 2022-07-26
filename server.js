const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const noteData = require("./db/db.json");

const PORT = process.env.PORT || 3000;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log("in here");
    //   console.log(__dirname);
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", (req, res) => {
    console.log("in here");
    //   console.log(__dirname);
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => res.json(noteData));

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    const newNote = {
        title: title,
        text: text,
        id: uuidv4(),
    };
    noteData.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) =>
        err ? console.error(err) : console.log("Success")
    );
    res.send(noteData);
});

app.delete("/api/notes/:id", (req, res) => {
    console.log(req.params.id);
    const index = noteData
        .map((item) => {
            return item.id;
        })
        .indexOf(req.params.id);
    noteData.splice(index, 1);

    fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) =>
        err ? console.error(err) : console.log("Success")
    );
    res.json({});
});
app.listen(PORT, () => {
    console.log(`Example app listening at https://localhost:${PORT}`);
});



// const fs = require("fs");
// const express = require('express');
// const router = express.Router();
// const { v4: uuidv4 } = require('uuid');
// const path = require('path');
// var notes = require('./develop/db/db.json');

// const PORT = process.env.PORT || 3001;

// const app = express();


// // Middleware for parsing JSON and urlencoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.use(express.static('develop/public'));

// // GET Route for homepage
// app.get('/', (req, res) =>
//     res.sendFile(path.join(__dirname, '/develop/public/index.html'))
// );

// // GET Route for feedback page
// app.get('/notes', (req, res) =>
//     res.sendFile(path.join(__dirname, '/develop/public/notes.html'))
// );

// // get request for notes list. returns json format of notes
// app.get("/api/notes", (req, res) =>

//     res.json(notes)
// );


// app.post("/api/notes", (req, res) => {
//     console.log('test');
//     const { title, text, id } = req.body;
//     const newNote = {
//         title: title,
//         text: text,
//         id: uuidv4()
//         // uuidv4(),
//     };
//     console.log('saved')
//     // notes.push(newNote);
//     fs.readFile('./develop/db/db.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             const ParsedNotes = JSON.parse(data);

//             // Add a new review
//             ParsedNotes.push(newNote);
//             fs.writeFile("/develop/db/db.json", JSON.stringify(notes), (err) =>
//                 err ? console.error(err) : console.log("file written")
//             );
//             res.send(notes);
//         }
//     })
// });

// app.delete("/api/notes/:note", (req, res) => {
//     const noteId = req.params.id;
//     readFromFile('develop/db/db.json')
//         .then((data) => JSON.parse(data))
//         .then((json) => {
//             // Make a new array of all tips except the one with the ID provided in the URL
//             const result = json.filter((note) => note.id !== noteId);

//             // Save that array to the filesystem
//             writeToFile('develop/db/tips.json', result);

//             // Respond to the DELETE request
//             res.json(`Item ${noteId} has been deleted 🗑️`);
//         });
// });

// app.listen(PORT, () =>
//     console.log(`App listening at http://localhost:${PORT}`)
// );

