const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
// Import battleship logic
const battleship = require('./battleship');

const { D_STATE } = battleship;
const { SHIPS } = battleship;
const { fireMissle } = battleship;
const { genBoard } = battleship;
const { placeShips } = battleship;

const mem = JSON.parse(JSON.stringify(D_STATE));
mem.player1.board = genBoard(10);
console.log(mem);

placeShips('battleship', [0, 0], false, mem);
placeShips('carrier', [0, 1], false, mem);

const app = express();
const PORT = 8080; // default port 8080

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/stylesheets'));

app.get('/', (req, res) => {
  console.log(mem);
  const templateVars = {
    board: mem.player1.board,
  };
  res.render('home', templateVars);
});

app.post('/fire', (req, res) => {
  console.log(req.body);
  fireMissle(mem.player1.board, [0, 0]);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
