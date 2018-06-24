function Grid () {
  this.pies = []
}

//Method that returns the pipe contained at the grid coordinates given
Grid.prototype.getPipe = function(x, y) {
  return this.pipes[x][y]
}


//Method that creates a board randomly
Grid.prototype.createBoard = function() {
  this.pipes = [[new Pipe([0, 1, 0, 1]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0])],
                [new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0])],
                [new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0])],
                [new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0])],
                [new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([1, 1, 1, 1]), new Pipe([0, 1, 0, 1])]]
}

// isConnected
//
// getNeighbours


Grid.prototype.draw = function() {
  var gridDiv = $('<div/>').attr('id', 'grid')
  for (var x = 0; x < this.pipes.length; x++) {
    var rowDiv = $('<div/>').attr('id', x).addClass('row')
    for (var y = 0; y < this.pipes[0].length; y++) {
      rowDiv.append(this.getPipe(x, y).draw(y, x))
    }
    gridDiv.append(rowDiv)
  }
  return gridDiv
}


Grid.prototype.updatePipe = function() {

}
