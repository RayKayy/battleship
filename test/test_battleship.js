var expect = require("chai").expect;
var assert = require("chai").assert;
var battleship = require('../battleship');

describe("Gameboard Generation & Manupilation", function(){
  it("genBoard should return a 10 by 10 array of arrays when given 10", function(){
    let board = battleship.genBoard(10);
    expect(board).to.have.lengthOf(10);
    expect(board[0]).to.have.lengthOf(10);
    expect(board[5]).to.have.lengthOf(10);
  });
  it("should return 'ship type already placed' when attempting to place same ship type", function(){
    let mem = JSON.parse(JSON.stringify(battleship.D_STATE));
    mem.player1.board = battleship.genBoard(10);
    battleship.placeShips('carrier',[0,0],false);
    assert.equal(battleship.placeShips('carrier',[3,3],false), 'Ship type already placed');
  });
  it("should return 'Out of range' when attempting to place ship outside board", function(){
    let mem = JSON.parse(JSON.stringify(battleship.D_STATE));
    //console.log(mem);
    mem.player1.board = battleship.genBoard(10);
    //assert.equal(battleship.placeShips('carrier',[9,9],false), 'Out of range');
    assert.equal(battleship.placeShips('battleship',[9,9],false), 'Out of range');
  });
})