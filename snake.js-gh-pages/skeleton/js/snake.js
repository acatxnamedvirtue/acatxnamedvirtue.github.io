(function() {
  window.Snake = window.Snake || {};

  var Snake = window.Snake.Snake = function () {
    this.length = 3;
    this.dir = "E";
    this.segments = [[5,0],[5,1],[5,2]];
    this.board = new window.Snake.Board(this);
    this.alive = true;
  };

  Snake.prototype.CollidesWithSelf = function(newHead) {
    for (var i = 0; i < this.length; i++) {
      if (String(this.segments[i]) === String(newHead)) {
        debugger
        return true;
      };
    };

    return false;
  }

  Snake.prototype.move = function() {
    var head = this.segments[this.length - 1];
    var dirOffset = Board.DIRS[this.dir];
    var newHead = [head[0] + dirOffset[0], head[1] + dirOffset[1]];
    var tail = this.segments[0];

    if (this.board.inBounds(newHead) && !this.CollidesWithSelf(newHead)) {
      var apple = (this.board.grid[newHead[0]][newHead[1]] === "\uD83C\uDF4E");

      this.segments.push(newHead);
      this.board.add(newHead);
      $('#snake-game').find('[data-pos="[' + newHead + ']"]').addClass('snake');

      if(!apple) {
        this.board.remove(this.segments.shift());
      }

      if(apple) {
        $('#snake-game').find('[data-pos="[' + newHead + ']"]').removeClass('apple');
        this.length += 1;
        this.board.addApple();
      }

      $('#snake-game').find('[data-pos="[' + tail + ']"]').removeClass('apple snake');
    } else {
      this.alive = false;
    }
  };



  Snake.prototype.stillAlive = function() {
    return this.alive;
  };

  Snake.prototype.turn = function(dir) {
    this.dir = dir;
  };

  var Board = window.Snake.Board = function(snake) {
    this.grid = this.setupGrid();
    this.snake = snake;
    this.addApple();
  };

  Board.DIRS = {
    "N":[-1,  0],
    "E":[ 0,  1],
    "S":[ 1,  0],
    "W":[ 0, -1],
  };

  Board.DIM_X = 10;
  Board.DIM_Y = 10;

  Board.prototype.inBounds = function(pos) {
    return pos[0] >= 0 && pos[0] < Board.DIM_X && pos[1] >= 0 && pos[1] < Board.DIM_Y;
  };

  Board.prototype.remove = function(pos){
    this.grid[pos[0]][pos[1]] = " ";
  };

  Board.prototype.add = function(pos){
    this.grid[pos[0]][pos[1]] = "\uD83D\uDC0D";
  };

  Board.prototype.addApple = function() {
    var x = Math.floor(Math.random() * Board.DIM_X);
    var y = Math.floor(Math.random() * Board.DIM_Y);

    while(this.snake.segments.includes([x,y])) {
      x = Math.floor(Math.random() * Board.DIM_X);
      y = Math.floor(Math.random() * Board.DIM_Y);
    }

    this.grid[x][y] = "\uD83C\uDF4E";
  };

  Array.prototype.includes = function(x) {
    for(var i = 0; i < this.length; i++) {
      if(String(this[i]) === String(x)) { return true;}
    }

    return false;
  };

  Board.prototype.setupGrid = function() {
    var grid = [];

    for(var i = 0; i < Board.DIM_X; i++) {
      grid[i] = [];
      $('#snake-game').append('<ul class="snake-row group" data-row="' + i + '"></ul>')

      for(var j = 0; j < Board.DIM_Y; j++) {
        grid[i].push(" ");
        $('[data-row="' + i + '"]').append('<li data-pos="[' + i + ',' + j + ']"></li>')
      };
    };

    return grid;
  };
})();
