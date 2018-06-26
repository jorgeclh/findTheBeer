function Game() {
  this.startPosition = [0, 0]
  this.endPosition = [4, 4]
}

//Function that initiates a new game when invoked
Game.prototype.newGame = function() {
  this.reset()
  this.draw()
}

//Function that prints the boards every time that is invoked
Game.prototype.draw = function() {
  this.deactivatePipes()
  this.activatePipes([[this.startPosition[0],this.startPosition[1]]])
  $('#board').replaceWith(this.grid.draw())
  this.setListeners()
}

//Function that resets the state of the game
Game.prototype.reset = function() {
  this.grid = new Grid()
  this.grid.createBoard()
  this.grid.getPipe(this.startPosition[0], this.startPosition[1]).lock()
  this.grid.getPipe(this.startPosition[0], this.startPosition[1]).activate()
  this.grid.getPipe(this.startPosition[0], this.startPosition[1]).source = true
  this.grid.getPipe(this.endPosition[0], this.endPosition[1]).lock()
}

//Function that rotates a pipe
Game.prototype.rotatePipe = function(id) {
  var coordinates = id.split('-')
  var pipe = this.grid.getPipe(coordinates[1], coordinates[0])
  pipe.rotate('left')

  this.draw()
}

//Function that returns the neighbours given coordinates
Game.prototype.getNeighbours = function(x, y) {
  return this.grid.getNeighbours(x, y)
}

//function that checks the conexion between pipes in the grid
Game.prototype.checkConnection = function(x, y, direction) {
  return this.grid.isConnected(x, y, direction)
}


//Function that activate al pipes reached
Game.prototype.activatePipes = function(nextIteration) {
  if (nextIteration != undefined && nextIteration.length > 0) {
    var thisIteration = nextIteration.slice()
    nextIteration = []
    for (var i = 0; i < thisIteration.length; i++) {
      //Como hemos llegado hasta ella, la activamos
      this.grid.getPipe(thisIteration[i][1], thisIteration[i][0]).activate()
      //Comprobamos sus vecinos
      var neighbours = this.getNeighbours(thisIteration[i][0], thisIteration[i][1])
      //Comprobamos cuales de ellos estan conectados
      for (var x = 0; x < neighbours.length; x++) {
        if (this.grid.isConnected(thisIteration[i][0], thisIteration[i][1], x)) {
          //Si lo estan los almacenamos para la siguiente iteracion SI NO ESTA YA ACTIVA
          var coord = this.grid.getRelativeCoordinate(thisIteration[i][0], thisIteration[i][1], x)
          if (coord != undefined && !this.grid.getPipe(coord[1], coord[0]).isActive()) {
            nextIteration.push(coord)
          }
        }
      }
    }
    this.activatePipes(nextIteration)
  }
}

Game.prototype.deactivatePipes = function() {
  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid[i].length; j++) {
      this.grid.getPipe(i, j).deactivate()
    }
  }
}





//Function that sets the listeners in every pipe
Game.prototype.setListeners = function() {
  var that = this;
  var pipes = document.getElementsByClassName('pipe')
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].onclick = function () {that.rotatePipe($(this).attr('id'))}
  }
}
