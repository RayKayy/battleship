const ALPHA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// An object acting as default game state.
const D_STATE = {
  player1: {
    shipsPlaced: [],
  },
  player2: {
    shipsPlaced: [],
  },
};
// An object containing ships and its length.
const SHIPS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

// Creates a memory object from D_STATE
const mem = JSON.parse(JSON.stringify(D_STATE));


// Generate Board => Takes in a number Returns an array of arrays
function genBoard(size) {
  const board = [];
  for (let x = 0; x < size; x++) {
    const row = [];
    for (let y = 0; y < size; y++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
}


// Place ships according to coords(array), and checks for invalid placements.
// Updates board if valid, else logs reason and return to previous board state.
const placeShips = function place(ship, coords, orient, player = 'player1') {

  const length = SHIPS[ship];
  const column = coords[0];
  const row = coords[1];
  let { board } = mem[player];
  const state = Array.from(board);

  if (mem[player].shipsPlaced.includes(ship)) {
    // console.log('Ship type already placed.')
    return 'Ship type already placed';
  }

  // If orient is true, place ship horizontally.
  if (orient) {
    // Check if ship will go out of range.
    if ((board[column][row + (length - 1)]) === undefined) {
      console.log('Out of range.');
      return 'Out of range';
    }
    for (let i = 0; i < length; i++) {
      // Check if tile occupied, if so revert back to previous board state.
      if (board[coords[0]][coords[1] + i] === 1) {
        board = state;
        console.log('Another ship is in the way');
        return 'Another ship is in the way';
      }
      board[coords[0]][coords[1] + i] = 1;
    }
    mem[player].shipsPlaced.push(ship);
    console.log(`${ship} placed`);
  }

  // If orient is false, place ship veritically.
  else if (!orient) {
    // Check if ship will go out of range.
    if ((board[column + (length - 1)]) === undefined) {
      console.log('Out of range.');
      return 'Out of range';
    }
    for (let i = 0; i < length; i++) {
      // Check if tile occupied, if so revert back to previous board state.
      if (board[coords[0] + i][coords[1]] === 1)  {
        console.log('Another ship is in the way');
        board = state;
        return 'Another ship is in the way';
      }
      board[coords[0] + i][coords[1]] = 1;
    }
    mem[player].shipsPlaced.push(ship);
    console.log(`${ship} placed`);
  }
};

// A function to fire and check if it hits/miss/targeted.
const fireMissle = function fire(board, coords) {
  const column = coords[1];
  const row = coords[0];
  const temp = board;

  // Check target status, return matching result.
  if (board[row][column] === 0) {
    temp[row][column] = 3;
    console.log('You missed!');
    return 'You missed!';
  } if (board[row][column] === 1) {
    temp[row][column] = 2;
    console.log('BOOM! HIT!');
    return 'BOOM! HIT!';
  }
  console.log('Targeted before');
  return 'Targeted before';
};


// Export for unit testing.
module.exports = {
  D_STATE,
  genBoard,
  placeShips,
};

// Game

// Testing
mem.player1.board = genBoard(10);
console.log(mem.player1);
placeShips('carrier',[0,0],false);
placeShips('battleship',[7,7],true);
console.log(mem.player1);
fireMissle(mem.player1.board, [0, 0]);
fireMissle(mem.player1.board, [0, 1]);
fireMissle(mem.player1.board, [0, 1]);
console.log(mem.player1);
