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
const ROWS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const mem = JSON.parse(JSON.stringify(D_STATE));
mem.player1.board = genBoard(10);
mem.player2.board = genBoard(10);
// const placeBoard = genBoard(10);
// mem.player1.enemyBoard = genBoard(10);
// console.log(mem.player1.board);

// placeShips('battleship', [0, 0], false, mem);
// placeShips('carrier', [2, 1], true, mem);

const app = express();
const PORT = 8080; // default port 8080

app.set('view engine', 'ejs');

let shiptype;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/stylesheets'));

app.get('/', (req, res) => {
  console.log(mem.player1.board);
  const templateVars = {
    board: mem.player1.board,
    alpha: ROWS,
  };
  res.render('home', templateVars);
});

// Render board setup page
app.get('/place', (req, res) => {
  console.log(mem.player2.board);
  const templateVars = {
    board: mem.player2.board,
    alpha: ROWS,
  };
  res.render('place_ship', templateVars);
});

app.post('/fire/:id', (req, res) => {
  console.log(req.params.id);
  const y = ROWS.indexOf(req.params.id.slice(0, 1));
  const x = Number(req.params.id.slice(1)) - 1;
  console.log(y, x);
  fireMissle(mem.player1.board, [y, x]);
  res.redirect('/');
});

app.post('/place/:id', (req, res) => {
  console.log(req.params.id);
  const y = ROWS.indexOf(req.params.id.slice(0, 1));
  const x = Number(req.params.id.slice(1)) - 1;
  console.log(y, x);
  placeShips(shiptype, [y, x], true, mem, 'player2');
  res.redirect('/place');
});

app.post('/type/:ship', (req, res) => {
  shiptype = req.params.ship;
  console.log(shiptype);
  res.redirect('/place');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
