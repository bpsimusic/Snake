const View = require('./snake-view');

$(()=>{
  const board = $(".board");
  new View(board);
});
