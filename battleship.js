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
  carrier: {
    id: 'ca',
    size: 5,
  },
  battleship: {
    id: 'ba',
    size: 4,
  },
  cruiser: {
    id: 'cr',
    size: 3,
  },
  submarine: {
    id: 'su',
    size: 3,
  },
  destroyer: {
    id: 'de',
    size: 2,
  },
};

const ID = ['ca', 'ba', 'cr', 'su', 'de'];

// Creates a memory object from D_STATE
// state


// Generate Board => Takes in a number Returns an array of arrays
function genBoard(size) {
  const board = [];
  for (let x = 0; x < size; x += 1) {
    const row = [];
    for (let y = 0; y < size; y += 1) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
}


// Place ships according to coords(array), and checks for invalid placements.
// Updates board if valid, else logs reason and return to previous board state.
const placeShips = function place(ship, coords, orient, state, player = 'player1') {
  const length = SHIPS[ship].size;
  const column = coords[0];
  const row = coords[1];
  let { board } = state[player];
  const tmp = Array.from(board);

  if (state[player].shipsPlaced.includes(ship)) {
    console.log('Ship type already placed.');
    return 'Ship type already placed';
  }

  // If orient is true, place ship horizontally.
  if (orient) {
    // Check if ship will go out of range.
    if ((board[column][row + (length - 1)]) === undefined) {
      console.log('Out of range.');
      return 'Out of range';
    }
    for (let i = 0; i < length; i += 1) {
      // Check if tile occupied, if so revert back to previous board state.
      if (board[coords[0]][coords[1] + i] !== 0) {
        board = tmp;
        console.log('Another ship is in the way');
        return 'Another ship is in the way';
      }
      board[coords[0]][coords[1] + i] = SHIPS[ship].id;
    }
    state[player].shipsPlaced.push(ship);
    console.log(`${ship} placed`);
    return `${ship} placed`;
  }

  // If orient is false, place ship veritically.
  if (!orient) {
    // Check if ship will go out of range.
    if ((board[column + (length - 1)]) === undefined) {
      console.log('Out of range.');
      return 'Out of range';
    }
    for (let i = 0; i < length; i += 1) {
      // Check if tile occupied, if so revert back to previous board state.
      if (board[coords[0] + i][coords[1]] !== 0) {
        console.log('Another ship is in the way');
        board = tmp;
        return 'Another ship is in the way';
      }
      board[coords[0] + i][coords[1]] = SHIPS[ship].id;
    }
    state[player].shipsPlaced.push(ship);
    console.log(`${ship} placed`);
    return `${ship} placed`;
  }
};

// A function to fire and check if it hits/miss/targeted.
const fireMissle = function fire(board, coords) {
  const column = coords[1];
  const row = coords[0];
  const temp = board;

  // Check target status, return matching result.
  if (board[row][column] === 0) {
    temp[row][column] = 'MISS';
    console.log('You missed!');
    return 'You missed!';
  } if (ID.includes(board[row][column])) {
    temp[row][column] = 'HIT';
    console.log('BOOM! HIT!');
    return 'BOOM! HIT!';
  }
  console.log('Targeted before');
  return 'Targeted before';
};


// Export for unit testing.
module.exports = {
  D_STATE,
  SHIPS,
  genBoard,
  placeShips,
  fireMissle,
};

// Game

// Testing
// mem.player1.board = genBoard(10);
// console.log(mem.player1);
// placeShips('battleship', [0, 0], false, mem);
// placeShips('carrier', [3, 3], false);
// console.log(mem.player1);
// fireMissle(mem.player1.board, [0, 0]);
// fireMissle(mem.player1.board, [0, 1]);
// fireMissle(mem.player1.board, [3, 3]);
// fireMissle(mem.player1.board, [7, 3]);
// console.log(mem.player1);
