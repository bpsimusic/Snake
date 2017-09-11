class Coord {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  plus(coord2){
    return new Coord(this.x + coord2[0], this.y + coord2[1]);
  }

  equals(coord2){
    return (this.x === coord2[0] && this.y === coord2[1]);
  }

  isOpposite(coord2){
    return (this.x === (-1 * coord2[0]) && this.y === (-1 * coord2[1]));
  }
}

module.exports = Coord;
