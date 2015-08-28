var colors = require('colors');

function Board() {
  this.grid = [[null, null, null],
               [null, null, null],
               [null, null, null]];
};

var SIZE = 3;

var POSITIONS = {
  "1": [0,0],
  "2": [0,1],
  "3": [0,2],
  "4": [1,0],
  "5": [1,1],
  "6": [1,2],
  "7": [2,0],
  "8": [2,1],
  "9": [2,2]
};

Board.prototype.won = function() {
  return !!this.winner();
};

Board.prototype.winner = function() {
  return this.diagWinner() || this.rowWinner() || this.colWinner();
};

Board.prototype.diagWinner = function() {
  if (this.grid[0][0] === this.grid[1][1] &&
    this.grid[1][1] === this.grid[2][2] &&
    this.grid[0][0] !== null) {
    return this.grid[0][0];
  } else if (this.grid[2][0] === this.grid[1][1] &&
      this.grid[1][1] === this.grid[0][2] &&
      this.grid[2][0] !== null) {
      return this.grid[2][0];
  } else {
    return null;
  };
};

Board.prototype.rowWinner = function() {
  for(var i = 0; i < SIZE; i++) {
    if (this.grid[i][0] === this.grid[i][1] &&
      this.grid[i][1] === this.grid[i][2] &&
      this.grid[i][0] !== null) {
        return this.grid[i][0];
    };
  };

  return null;
};

Board.prototype.colWinner = function() {
  for(var j = 0; j < SIZE; j++) {
    if (this.grid[0][j] === this.grid[1][j] &&
      this.grid[1][j] === this.grid[2][j] &&
      this.grid[0][j] !== " ") {
        return this.grid[0][j];
    };
  };

  return null;
};

Board.prototype.empty = function(pos) {
  return this.grid[pos[0]][pos[1]] === null;
};

Board.prototype.placeMark = function(posNumber, mark) {
  var pos = POSITIONS[posNumber];
  if(this.empty(pos)) {
    this.grid[pos[0]][pos[1]] = mark;
    return true;
  } else {
    return false;
  };
};

Board.prototype.toS = function(cell) {
  if (cell === null) {
    return " ";
  } else {
    return cell;
  };
};

Board.prototype.print = function() {
  for(var i = 0; i < SIZE - 1; i++) {
    console.log(this.toS(this.grid[i][0]).underline + "|" + this.toS(this.grid[i][1]).underline + "|" + this.toS(this.grid[i][2]).underline);
  }
  console.log(this.toS(this.grid[i][0]) + "|" + this.toS(this.grid[i][1]) + "|" + this.toS(this.grid[i][2]));
};



module.exports = Board;
