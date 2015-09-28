(function () {
  window.Snake = window.Snake || {};

  var View = Snake.View = function (snake, $el) {
    this.snake = snake;
    this.$el = $el;
    this.bindEvents();
    this.started = false;
  }

  View.prototype.bindEvents = function(){
    $(document).on("keydown", this.handleKeypress.bind(this));
  };

  View.prototype.run = function(){
    this.intID = setInterval(this.step.bind(this), 200);
    this.render();
  }

  View.prototype.step = function(){
    if (this.snake.stillAlive()){
      this.snake.move();
      this.render();
    } else {
      clearInterval(this.intID);
      alert("Sorry, you lost!")
    }
  };

  View.prototype.handleKeypress = function(e){
    switch (e.keyCode){
      case 65:
        if(this.snake.dir != "E") { this.snake.turn("W"); };
        break;
      case 87:
        if(this.snake.dir != "S") { this.snake.turn("N"); };
        break;
      case 68:
        if(this.snake.dir != "W") { this.snake.turn("E"); };
        break;
      case 83:
        if(this.snake.dir != "N") { this.snake.turn("S"); };
        break;
      case 82:
        if(!this.started) {
          this.run();
          this.started = true;
        }
        break;
    };
  };

  View.prototype.render = function() {
    console.log("render!");
    for(var i = 0; i < Snake.Board.DIM_X; i++) {
      for(var j = 0; j < Snake.Board.DIM_Y; j++) {
        var pos = [i,j];
        $('#snake-game').find('[data-pos="[' + pos + ']"]').text(this.snake.board.grid[i][j])

        if($('#snake-game').find('[data-pos="[' + pos + ']"]').text() === "\uD83C\uDF4E") {
          $('#snake-game').find('[data-pos="[' + pos + ']"]').addClass('apple');
        }

        if($('#snake-game').find('[data-pos="[' + pos + ']"]').text() === "\uD83D\uDC0D") {
          $('#snake-game').find('[data-pos="[' + pos + ']"]').addClass('snake');
        }
      }
    }
  };
})();
