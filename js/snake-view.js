const Board = require("./board");

class View {
  constructor($el){
    this.$el = $el; //html element
    this.board = new Board(20);
    this.board.render.bind(this);
    $(document).keydown(this.handleKeyEvent.bind(this));
    this.interval = setInterval(this.step.bind(this), 500);
  }

  handleKeyEvent(e){
      if (e.keyCode === 37) {
        this.board.snake.turn("W");
      } else if (e.keyCode === 38) {
        this.board.snake.turn("N");
      } else if (e.keyCode === 39) {
        this.board.snake.turn("E");
      } else if (e.keyCode === 40) {
        this.board.snake.turn("S");
      }
  }

  step(){
    const keepPlaying = this.board.snake.move();
    
    if(keepPlaying){
      this.board.render();
    } else {
      clearInterval(this.interval);
    }
  }
}

module.exports = View;
