const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the "music" and "images" directories
app.use('/music', express.static(path.join(__dirname, 'music')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/songs', (req, res) => {
  const songs = require('./songs.json');
  res.json(songs);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
