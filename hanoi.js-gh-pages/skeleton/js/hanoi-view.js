(function () {
  window.Hanoi = window.Hanoi || {};

  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.bindEvents();
    this.firstClick = null;
  };

  View.CLASS_MAP = {1:"one",
                    2:"two",
                    3:"three"}

  View.prototype.bindEvents = function(){
    this.$el.on("click","ul", this.handleClick.bind(this));
  };

  View.prototype.setupTowers = function(){
    var html = '';
    for(var i = 0; i < 3; i++){
      html = html.concat("<ul class='hover' data-pos=" + i + ">");
      for(var j = 0; j < 3; j++){
        html = html.concat("<li data-pos=[" + [i, 2 - j] + "]></li>");
      };
      html = html.concat("</ul>");
    };
    this.$el.append(html);
    this.render();
  };

  View.prototype.handleClick = function(e){
    this.clickTower($(e.currentTarget));

  };

  View.prototype.isFirstClick = function() {
    return this.firstClick === null;
  };

  View.prototype.isValidMove = function(startTower, endTower) {
    return this.game.isValidMove(startTower, endTower);
  }

  View.prototype.isEmptyTower = function($tower) {
    return this.game.towers[$tower.data("pos")].length === 0;
  };

  View.prototype.clickTower = function($tower){
    if (this.isFirstClick() && !this.isEmptyTower($tower) ){
      this.firstClick = $tower.data("pos");
    } else if (this.isFirstClick() && this.isEmptyTower($tower)){
      alert("That is an empty tower!");
    } else {
      if(!this.isValidMove(this.firstClick, $tower.data("pos"))) {
        alert("That is not a valid move!");
      } else {
        this.game.move(this.firstClick, $tower.data("pos"));
        };
      this.firstClick = null;
    };

    if (this.gameOver()) {
      this.endGameRender();
      alert("Congrats, you won!")
    } else {
      this.render();
    }
  };

  View.prototype.gameOver = function() {
    return this.game.isWon();
  }

  View.prototype.endGameRender = function(){
    this.render();
    this.$el.off()
    $('#hanoi-game').find('ul').removeClass('hover');
  };

  View.prototype.render = function (){
    $('#hanoi-game').find("li").removeClass();
    var towers = this.game.towers;
    for(var i = 0; i < towers.length; i++){
      for(var j = 0; j < towers[i].length; j++){
        $('#hanoi-game').find("li[data-pos='["+ [i,j] +"]']").addClass("" + View.CLASS_MAP[towers[i][j]]);
      };
    };
  };
})();
