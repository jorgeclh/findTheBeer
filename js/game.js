function Game() {
  this.startPosition = [0, 0]
  this.endPosition = [4, 4]
}


Game.prototype.newGame = function() {
  this.reset()
  this.draw()



}




Game.prototype.draw = function() {
  $('#board').append(this.grid.draw())
}


Game.prototype.reset = function() {
  this.grid = new Grid()
  this.grid.createBoard()
}
