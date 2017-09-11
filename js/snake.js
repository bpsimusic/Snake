const Coord = require("./coord");

class Snake {
  constructor(board){
    this.direction = "N";
    let head = new Coord(Math.floor(board.dim/2), Math.floor(board.dim/2)); //head.x, head.y

    this.segments = [head];
  }

  move(){
    let keepPlaying;
    for (let i = 0; i < this.segments.length; i++) {
      if(this.direction === "E"){
        this.segments[i] = this.segments[i].plus(Snake.DIRS.E);
      } else if (this.direction === "W"){
        this.segments[i] = this.segments[i].plus(Snake.DIRS.W);
      } else if (this.direction === "N"){
        this.segments[i] = this.segments[i].plus(Snake.DIRS.N);
      } else if (this.direction === "S"){
        this.segments[i] = this.segments[i].plus(Snake.DIRS.S);
      }
    }
    for (let i = 0; i < this.segments.length; i++) {
      if(this.segments[i].y > 19 || this.segments[i].y < 0 ||
      this.segments[i].x > 19 || this.segments[i].x < 0){
        alert("You Lose");
        keepPlaying = false;
      } else {
        keepPlaying = true;
      }
    }
    return keepPlaying;
  }

  turn(direction){
    this.direction = direction;
  }
}

Snake.DIRS = {
  E: [0,1],
  W: [0,-1],
  N: [-1,0],
  S: [1,0]
};

Snake.SYMBOL = "S";







module.exports = Snake;
