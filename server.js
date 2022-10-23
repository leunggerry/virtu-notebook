/**
 * Import Modules
 **************************************************************************************************/
const { application } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");
//get the notes
const notes = require("./db/db.json");

/**
 * Global Variables
 **************************************************************************************************/
//instantiate the server
const app = express();

const PORT = process.env.PORT || 3001;

/**
 * Function Definitions
 **************************************************************************************************/

/**
 * Main Function calls
 **************************************************************************************************/
//route /notes should return notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// route /api/notes/ should return notes.html
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// home default route should return the index.html
// return the index file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// create listener for the server
app.listen(3001, () => {
  console.log(`API server now on port ${PORT}`);
});
