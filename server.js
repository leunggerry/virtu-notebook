/**
 * Import Modules
 **************************************************************************************************/
const { application } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");
//get the notes
const notesDb = require("./db/db.json");

/**
 * Global Variables
 **************************************************************************************************/
//instantiate the server
const app = express();

const PORT = process.env.PORT || 3001;

/**
 * Function Definitions
 **************************************************************************************************/
function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
}
function addNewNote(body, notesArray) {
  // console.log(body);
  const note = body;

  // add the new note to the db
  notesArray.push(note);
  // write the note array to the db.json
  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notesArray));

  return note;
}

/**
 * Main Function calls
 **************************************************************************************************/
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// middleware for to server the style sheets and the js files
app.use(express.static("public"));

// route /api/notes/ should return notes.html
app.get("/api/notes", (req, res) => {
  res.json(notesDb);
});

//route /notes should return notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// post route to add a note
app.post("/api/notes", (req, res) => {
  // set an id of each post
  req.body.id = notesDb.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    // add note to the JSON db file and array
    const newNote = addNewNote(req.body, notesDb);

    res.json(newNote);
  }
});

// home default route should return the index.html
// return the index file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// all final routes that are unexpected
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// create listener for the server
app.listen(3001, () => {
  console.log(`API server now on port ${PORT}`);
});
