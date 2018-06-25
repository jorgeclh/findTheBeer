function Game() {
  this.startPosition = [0, 0]
  this.endPosition = [4, 4]
}


Game.prototype.newGame = function() {
  this.reset()
  this.draw()
  this.setListeners()
}


Game.prototype.draw = function() {
  $('#board').append(this.grid.draw())
}


Game.prototype.reset = function() {
  this.grid = new Grid()
  this.grid.createBoard()
  this.grid.getPipe(this.startPosition[0], this.startPosition[1]).lock()
  this.grid.getPipe(this.startPosition[0], this.startPosition[1]).activate()
  this.grid.getPipe(this.endPosition[0], this.endPosition[1]).lock()
}


Game.prototype.rotatePipe = function(id) {
  console.log(id)
  var coordinates = id.split('-')
  var pipe = this.grid.getPipe(coordinates[1], coordinates[0])
  pipe.rotate('left')
  var neighbours = this.grid.getNeighbours(coordinates[0], coordinates[1])

  for (var i = 0, j = 2; i < pipe.type.length; i++, j++) {
    if (pipe.type[i] == 1 && neighbours[i] != undefined && neighbours[i].type[j] == 1 && neighbours[i].active == true){
      pipe.activate()
      break;
    } else {
      pipe.deactivate()
    }
    if (j == 3) j -= 4
  }

  console.log(pipe)
  $('#' + id).replaceWith(this.grid.getPipe(coordinates[1], coordinates[0]).draw(coordinates[0], coordinates[1]))
  this.setListeners()

}


Game.prototype.setListeners = function() {
  var that = this;
  var pipes = document.getElementsByClassName('pipe')
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].onclick = function () {that.rotatePipe($(this).attr('id'))}
  }
}
