const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const notesDB = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

// Tool for middleware transition
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", (req, res) => {
    console.log("in here");
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => res.json(notesDB));

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    const newNote = {
        title: title,
        text: text,
        id: uuidv4(),
    };
    notesDB.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notesDB), (err) =>
        err ? console.error(err) : console.log("Write successful")
    );
    res.send(notesDB);
});

app.post("/api/notes", (req, res) => {
    console.log('test');
    const { title, text, id } = req.body;
    const newNote = {
        title: title,
        text: text,
        id: uuidv4()
        // uuidv4(),
    };
    console.log('saved')
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const ParsedNotes = JSON.parse(data);
            ParsedNotes.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(notes), (err) =>
                err ? console.error(err) : console.log("file written")
            );
            res.send(notes);
        }
    })
});

app.listen(PORT, () => {
    console.log(`Example app listening at https://localhost:${PORT}`);
});


