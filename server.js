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
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// get function for initial page load
app.get("/api/notes", (req, res) => res.json(notesDB));

// post functions for new notes
app.post("/api/notes", (req, res) => {
    // defines item of the body of the request sent from the index.js file
    const { title, text } = req.body;
    const newNote = {
        title: title,
        text: text,
        // randomly generated ID
        id: uuidv4(),
    };
    // pushes new note to existing DB
    notesDB.push(newNote);
    // overwrites DB file with new DB that contains new note
    fs.writeFile("./db/db.json", JSON.stringify(notesDB), (err) =>
        err ? console.error(err) : console.log("test")
    );
    res.send();
});

// Initiate Delete directory
app.delete("/api/notes/:id", (req, res) => {
    // console logs ID for delete URL
    console.log(req.params.id);

    // loops through notes database searching for the note ID, the removes that note using the splice function 
    for (i = 0; i < notesDB.length; i++) {
        if (notesDB[i].id == req.params.id) {
            notesDB.splice(i, 1)
            console.log(notesDB)
        }
    }
    // overwrites existing database file with new db
    fs.writeFile("./db/db.json", JSON.stringify(notesDB), (err) =>
        err ? console.error(err) : console.log("Success")
    );
    res.json();
});

app.listen(PORT, () => {
    console.log(`Example app listening at https://localhost:${PORT}`);
});


