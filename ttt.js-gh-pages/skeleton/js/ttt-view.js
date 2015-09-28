
(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    this.$el.on("click","li", this.handleLiClick.bind(this));
  };

  View.prototype.handleLiClick = function(e){
    var $li = $(e.currentTarget);
    this.makeMove($li);
  }

  View.prototype.makeMove = function ($square) {
    var player = this.game.currentPlayer;

    try {
      this.game.playMove($square.data('pos'));
      $square.addClass(player);
      $square.removeClass("empty");
    } catch (e) {
      if (e instanceof TTT.MoveError) {
        alert(e.msg);
      } else {
        throw e;
      };
    };

    if (this.game.isOver()){
      this.renderEndgame();
      alert("Congrats " + this.game.winner() + "!");
    };
  };

  View.prototype.renderEndgame = function(){
    $("li." + this.game.winner()).addClass("winner");
    $("li.empty").addClass("leftover");
    $("li.empty").removeClass("empty");
    this.$el.off();
    $("li").addClass("finished");
  };

  View.prototype.setupBoard = function () {
    var html = '<ul class="ttt-grid group">';
    for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++) {
        html = html.concat("<li class='empty' data-pos=[" + [i,j] + "]></li>")
      };
    };
    html = html.concat("</ul>");
    this.$el.append(html);
  };
})();
