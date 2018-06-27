function Game() {
  this.startPosition = [0, 0]
  this.endPosition = [4, 4]
  this.totalTime = 60
  this.time = 60
  this.interval
}

//Function that initiates a new game when invoked
Game.prototype.newGame = function() {
  this.reset()
  this.draw()
  this.start(10)
}

//Function that starts the timer
Game.prototype.start = function(seconds) {
  this.totalTime = seconds
  this.drawCountdown()
  this.time = this.totalTime
  var that = this
  this.interval = window.setInterval(function () {
    that.time--
    that.drawCountdown()
    that.checkWin()
    if (that.time <= 0) {
      that.gameOver()
      clearInterval(that.interval)
    }
  }, 1000)
}

Game.prototype.gameOver = function() {
  clearInterval(this.interval)
  this.lockPipes()
  this.drawCountdown('lose')
}


Game.prototype.checkWin = function() {
  if (this.grid.getPipe(this.endPosition[1], this.endPosition[0]).isActive()) {
    clearInterval(this.interval)
    this.lockPipes()
    this.drawCountdown('win')
  }
}

//Function that prints the boards every time that is invoked
Game.prototype.draw = function() {
  this.deactivatePipes()
  this.activatePipes([[this.startPosition[0],this.startPosition[1]]])
  $('#board').empty()
  $('#board').append(this.grid.draw())
  this.setListeners()
}

//Function that resets the state of the game
Game.prototype.reset = function() {
  console.log('hola')
  this.grid = new Grid()
  this.grid.createBoard()
  this.grid.getPipe(this.startPosition[0], this.startPosition[1]).lock()
  this.grid.getPipe(this.startPosition[0], this.startPosition[1]).origin = true
  this.grid.getPipe(this.endPosition[0], this.endPosition[1]).lock()
  this.grid.getPipe(this.endPosition[0], this.endPosition[1]).goal = true
  clearInterval(this.interval)
}

Game.prototype.drawCountdown = function(state) {
  $('#control').empty()
  var controlDiv
  if (state == undefined) {
    controlDiv = $('<div/>').addClass('countdown').html('Time left: ' + this.time + ' seconds')
  } else if (state.localeCompare('win') == 0) {
    controlDiv = $('<div/>').addClass('win').html('Winner winner, chicken dinner!')
  } else if (state.localeCompare('lose') == 0) {
    controlDiv = $('<div/>').addClass('lose').html('You spoiled the beer!')
  }
  $('#control').append(controlDiv)
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
      for (var x = 0, q = 2; x < neighbours.length; x++) {
        if (this.grid.getPipe(thisIteration[i][1], thisIteration[i][0]).type[x] == 1 && neighbours[x] != undefined && neighbours[x].type[q] == 1) {
          //Si lo estan los almacenamos para la siguiente iteracion SI NO ESTA YA ACTIVA
          var coord = this.grid.getRelativeCoordinate(thisIteration[i][0], thisIteration[i][1], x)
          if (coord != undefined && !this.grid.getPipe(coord[1], coord[0]).isActive()) {
            nextIteration.push(coord)
          }
        }
        q++
        if (q > 3) q = 0
      }
    }
    this.activatePipes(nextIteration)
  }
}

//Function that deactivatres all the pipes before redrawing
Game.prototype.deactivatePipes = function() {
  for (var i = 0; i < this.grid.pipes.length; i++) {
    for (var j = 0; j < this.grid.pipes[i].length; j++) {
      this.grid.getPipe(i, j).deactivate()
    }
  }
}


Game.prototype.lockPipes = function() {
  for (var i = 0; i < this.grid.pipes.length; i++) {
    for (var j = 0; j < this.grid.pipes[i].length; j++) {
      this.grid.getPipe(i, j).lock()
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
