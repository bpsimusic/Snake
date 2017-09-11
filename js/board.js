const Snake = require("./snake");

class Board {
  constructor(dim){
    this.dim = dim;
    this.snake = new Snake(this);
    this.grid = null;
  }

  static createGrid(dim){
    let grid = [];
    for (let i = 0; i < dim; i++) {
      let row = [];
      for (let j = 0; j < dim; j++) {
        row.push(".");
      }
      grid.push(row);
    }
    return grid;
  }

  render(){
    $(".board").empty();
    this.grid = Board.createGrid(this.dim);

    this.snake.segments.forEach(segment=>{

      this.grid[segment.x][segment.y] = Snake.Symbol;
    });
    // draw the board onto html document using jquery
    this.grid.forEach((row,x)=>{
      let list = $("<ul>");
      row.forEach((square,y)=>{
        if (this.grid[x][y] === Snake.Symbol){
          list.append($("<li>").addClass("snake"));
        } else {
          list.append($("<li>"));
        }
      });
      $(".board").append(list);
    });
  }
}

module.exports = Board;
