const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());

// Carrega o JSON de músicas
let songs = JSON.parse(fs.readFileSync('./data/songs.json', 'utf-8'));

// Define música atual
let currentSong = songs[10];

app.get('/songs', (req, res) => {
  res.json(songs);
});

app.get('/current-song', (req, res) => {
  res.json(currentSong);
});

app.post('/change-song', (req, res) => {
  const newSong = req.body;
  currentSong = newSong;

  // Adiciona à lista caso ainda não esteja
  if (!songs.find(s => s.title === newSong.title)) {
    songs.push(newSong);
  }

  res.json({ message: 'Música atualizada com sucesso!' });
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
