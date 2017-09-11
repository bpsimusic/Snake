/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(1);

$(()=>{
  const board = $(".board");
  new View(board);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(3);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(4);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map