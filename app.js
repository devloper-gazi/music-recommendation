const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

function recommendSong(genre) {
  const songsByGenre = {
    pop: [
      "Shape of You", "Billie Jean", "Despacito", "Uptown Funk", "Can't Stop the Feeling"
    ],
    rock: [
      "Bohemian Rhapsody", "Hotel California", "Smells Like Teen Spirit", "Sweet Child o' Mine", "Wonderwall"
    ],
    electronic: [
      "Strobe", "Clarity", "Titanium", "Animals", "Faded"
    ],
    classical: [
      "Moonlight Sonata", "Für Elise", "The Four Seasons", "Swan Lake", "Canon in D"
    ]
  };

  return songsByGenre[genre] ? getRandomElement(songsByGenre[genre]) : null;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/recommend', (req, res) => {
  const genre = req.body.genre.toLowerCase();
  const recommendedSong = recommendSong(genre);
  
  res.render('index', { genre, recommendedSong }); // Burada recommendedSong değişkenini iletiyoruz.
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
