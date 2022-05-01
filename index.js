const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  morgan = require("morgan");

const app = express();

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    username: 'J4ne',
    email: 'Jane.Doe@mail.com',
    password: 'vZR34!pj#a',
    birthday: '04/12/1987',
    favorites: [],
  },
  {
    id: 2,
    username: 'J0hn',
    email: 'John.Smith@mail.com',
    password: 'H98vXE!#q',
    birthday: '06/25/1992',
    favorites: [],
  }
];

let movies = [
  {
    Title: "Dog",
    Description:
      "Two former Army Rangers Briggs and a Belgian Malinois named Lulu journey to a fellow soldier's funeral.",
    Genre: {
      Name: "Comedy",
      Description:
        "Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium.",
    },

    Director: {
      Names: "Reid Carolin",
      Bio: "Reid Carolin is an American film producer, director, and screenwriter.",
      Birth: "Reid Carolin was born January 10, 1982.",
    },
    ImagePath:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYfOlKIxkS4ULGULhHT7o7THm93GGoGMjAaQEjnlrzGElbX8Dp",
    Featured: true,
  },
  {
    Title: "Lord of the Rings",
    Description:
      "A shy young hobbit named Frodo Baggins inherits a simple gold ring thatt holds the secret to the survival--or enslavement of the entire world.",
    Genre: {
      Name: "Adventure",
      Description:
        "An adventure is an exciting experience or undertaking that is typically bold, sometimes risky.",
    },

    Director: {
      Name: "Peter Jackson",
      Bio: "Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter, and film producer.",
      Birth: "October 31, 1961",
    },
    ImagePath:
      "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
    Featured: true,
  },

  {
    Title: "John Wick",
    Description:
      "A retired hitman is forced back into action by a sadistic younfg thug, he hunts down his adverseries with the skill and ruthlessness that made him an underworld legend.",
    Genre: {
      Name: "Action",
      Description:
        "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
    },

    Director: {
      Name: "Chad Stahelski",
      Bio: "Chad Stahelski is an American stuntman and film director.",
      Birth: "September 20, 1968",
    },
    ImagePath:
      "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg",
    Featured: true,
  },
];

// Gets the list of data about ALL movies
app.get('/movies', (req,res) => {
  res.json(movies);
});

// Gets the data about a single movie, by title
app.get('/movies/:Title', (req,res) => {
  res.json(movies.find((movies) =>
  {return movies.Title === req.params.Title }));
});

// Gets data about a genre by name/title
app.get('/movies/genre/:Name', (req,res) => {
  res.send('Successful GET request that returns data on genre.');
});

// Gets data about a director by name
app.get('/director/:Name', (req,res) => {
  res.send('Successful GET request that returns data on director.');
});

// Adds data for a new user to our list of users
app.post('/users', (req, res) => {
  res.send('Successful POST request that adds data for a new user.');
  // let newUser = req.body;

  // if (!newUser.name) {
  //   const message = 'Missing name in request body';
  //   res.status(400).send(message);
  // } else {
  //   newUser.id = uuid.v4();
  //   users.push(newUser);
  //   res.status(201).send(newUser);
  // }
});

// Update the "username" of a user
app.put('/users/:Username', (req, res) => {
  res.send('Successful PUT request that updates a users username.')
});

// Add movies to users list of favorites
app.post('/users/:Username/movies/:MovieID', (req,res) => {
  res.send('Successful POST request to add a movie to users favorites.');
});

// Removes movie from users list of favorites
app.delete('/users/:Username/movies/:MovieID', (req,res) => {
  res.send('Successful DELETE request to remove movie from users favorites.');
});

// Deletes a user from our list by ID
app.delete('/users/:id', (req, res) => {
  res.send('Successful DELETE request that deletes a user from list by ID.');
  // let user = users.find((user) => { return user.id === req.params.id });

  // if (user) {
  //   users = users.filter((obj) => { return obj.id !== req.params.id });
  //   res.status(201).send('User ' + req.params.id + ' was deleted.');
  //}
});

// Logger
app.use(morgan("common"));

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my movie app!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//serves “documentation.html” file from the public folder
app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

//Listen for request
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
