const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan');

const app = express();

let topMovies = [
  {
    title: 'Dog',
    director: 'Reid Carolin, Channing Tatum'
  },
  {
    title: 'Lord of the Rings',
    director: 'Peter Jackson'
  },
  {
    title: 'John Wick',
    director: 'Chad Stahelski'
  },
  {
    title: 'John Wick: Chapter 2',
    director: 'Chad Stahelski'
  },
  {
    title: 'John Wick: Chapter 3',
    director: 'Chad Stahelski'
  },
  {
    title: 'The Hitman\'s Bodyguard',
    director: 'Patrick Hughes'
  },
  {
    title: 'The Batman',
    director: 'Matt Reeves'
  },
  {
    title: 'A Quiet Place',
    director: 'John Krasinski'
  },
  {
    title: 'A Quiet Place Part 2',
    director: 'John Krasinski'
  },
  {
    title: 'Love and Monsters',
    director: 'Michael Matthews'
  },
  
];

// Logger
app.use(morgan('common'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});

app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

//serves “documentation.html” file from the public folder
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

//Listen for request
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });