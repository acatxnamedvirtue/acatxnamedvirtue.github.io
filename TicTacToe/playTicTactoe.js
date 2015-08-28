var Index = require("./index");
var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var game = new Index.Game(reader);
game.run(function() { return reader.close() });
