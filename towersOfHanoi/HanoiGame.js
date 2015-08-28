var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame() {
  this.stacks = [[3, 2, 1],[],[]];
};

HanoiGame.prototype.isWon = function() {
  return (this.stacks[0].length === 0 &&
    (this.stacks[1].length === 0 || this.stacks[2].length === 0));
};

HanoiGame.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
  var startTower = this.stacks[startTowerIdx];
  var endTower = this.stacks[endTowerIdx];

  if ((endTower.length === 0) ||
    (startTower[startTower.length - 1] < endTower[endTower.length - 1])) {
    return true;
  } else {
    return false;
  };
};

HanoiGame.prototype.move = function(startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    var startTower = this.stacks[startTowerIdx];
    var endTower = this.stacks[endTowerIdx];

    endTower.push(startTower.pop());
    return true;
  } else {
    return false;
  };
};

HanoiGame.prototype.print = function() {
  for(var i = 0; i < this.stacks.length; i++) {
    console.log(JSON.stringify(this.stacks[i]));
  };
};

HanoiGame.prototype.promptMove = function(callback) {
  this.print();

  reader.question("Enter Start Tower", function (startTower) {
    reader.question("Enter End Tower", function (endTower) {
      var startIdx = parseInt(startTower);
      var endIdx = parseInt(endTower);

      callback(startIdx, endIdx);
    });
  });
};

HanoiGame.prototype.run = function (completionCallback) {
  var game = this;

  this.promptMove(function(startTower, endTower){
    if (game.move(startTower, endTower)) {
      if (game.isWon()) {
        game.print();
        console.log("You win!");
        completionCallback();
      } else {
        game.run(completionCallback);
      };
    } else {
      console.log("That is not a valid move!");
      game.run(completionCallback);
    };
  });
};

var game = new HanoiGame();
console.log(game.isWon())
game.run(function(){ reader.close()});
