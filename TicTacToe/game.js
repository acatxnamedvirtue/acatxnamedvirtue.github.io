var Board = require("./board");

function Game(reader) {
  this.reader = reader;
  this.currentPlayer = "X";
  this.board = new Board();
};

Game.prototype.run = function(completionCallback) {
  var game = this;

  this.promptMove(function(posNumber) {
    if (game.move(posNumber)) {
      if (game.over()) {
        game.render();
        console.log("Congrats, " + game.winner() + ", you win!");
        completionCallback();
      } else {
        game.switchPlayers();
        game.run(completionCallback);
      };
    } else {
      console.log("That is not a valid move!");
      game.run(completionCallback);
    };
  });
};

Game.prototype.promptMove = function(callback) {
  this.render();
  console.log(this.currentPlayer + ", it's your turn!");
  this.reader.question("Enter a position to mark (1 thru 9)", function(posNumber) {
    callback(posNumber);
  });
};

Game.prototype.move = function(posNumber) {
  return this.board.placeMark(posNumber, this.currentPlayer);
};

Game.prototype.render = function() {
  this.board.print();
};

Game.prototype.over = function() {
  return this.board.won();
}

Game.prototype.winner = function() {
  return this.board.winner();
}

Game.prototype.switchPlayers = function() {
  this.currentPlayer === "X" ? this.currentPlayer = "O" : this.currentPlayer = "X";
};

module.exports = Game;
