function Game() {
  this.startPosition = [0, 0]
  this.endPosition = [5, 9]
  this.totalTime = 90
  this.time = 90
  this.interval
  this.openPath = false
  this.cheat = false
  this.bgMusic = new Audio('sounds/backgroundSong.mp3')
}

//Function that initiates a new game when invoked
Game.prototype.newGame = function() {
  this.reset()
  this.draw()
  this.start(90)
}

//Function that starts the timer
Game.prototype.start = function(seconds) {
  this.bgMusic.play()
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
  this.bgMusic.pause()
  this.loseSound()
}


Game.prototype.checkWin = function() {
  this.checkOpenPath()
  if (this.grid.getPipe(this.endPosition[0], this.endPosition[1]).isActive() && !this.openPath) {
    clearInterval(this.interval)
    this.lockPipes()
    this.bgMusic.pause()
    this.winSound()
    this.drawCountdown('win')
  }
}

//Function that checks if there is any open path before reaching the end pipe
Game.prototype.checkOpenPath = function() {
  this.openPath = false
  for (var i = 0; i < this.grid.pipes.length; i++) {
    for (var j = 0; j < this.grid.pipes[i].length; j++) {
      if (!this.openPath && this.grid.getPipe(i, j).isActive()) {
        for (var x = 0; x < this.grid.getPipe(i, j).type.length; x++) {
          if (this.grid.getPipe(i, j).type[x] == 1 && !this.grid.isConnected(j, i, x)) {
            this.openPath = true
          }
        }
      }
    }
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
  this.grid = new Grid()
  this.grid.createBoard()
  this.grid.getPipe(this.startPosition[0], this.startPosition[1]).lock()
  this.grid.getPipe(this.startPosition[0], this.startPosition[1]).origin = true
  this.grid.getPipe(this.endPosition[0], this.endPosition[1]).lock()
  this.grid.getPipe(this.endPosition[0], this.endPosition[1]).goal = true
  clearInterval(this.interval)
}

//Function that draws the countdown div
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
  this.rotateSound()
  this.draw()
}


//Function that activate all pipes reached
Game.prototype.activatePipes = function(nextIteration) {
  //Al ser recursiva, puede darse el caso de que el parámetro llegue vacio, momento en el que debe detenerse la ejecución
  if (nextIteration != undefined && nextIteration.length > 0) {
    //Obtenemos la posición a evaluar dentro del array de posiciones
    var thisIteration = nextIteration.slice()
    //Vaciamos la variable para poder rellenarla en esta ejecución y enviarla como parámetro en la siguiente
    nextIteration = []
    for (var i = 0; i < thisIteration.length; i++) {
      //Como hemos llegado hasta ella, la activamos
      this.grid.getPipe(thisIteration[i][1], thisIteration[i][0]).activate()
      //Comprobamos sus vecinos
      var neighbours = this.grid.getNeighbours(thisIteration[i][0], thisIteration[i][1])
      //Comprobamos cuales de ellos estan conectados
      for (var x = 0, q = 2; x < neighbours.length; x++) {
        if (this.grid.getPipe(thisIteration[i][1], thisIteration[i][0]).type[x] == 1 && neighbours[x] != undefined && neighbours[x].type[q] == 1) {
          //Si lo estan los almacenamos para la siguiente iteracion SI NO ESTA YA ACTIVA
          var coord = this.grid.getRelativeCoordinate(thisIteration[i][0], thisIteration[i][1], x)
          if (coord != undefined && !this.grid.getPipe(coord[1], coord[0]).isActive()) {
            nextIteration.push(coord)
          }
        }
        //Al haber un desplazamiento de 2 entre un elemento y otro, usamos este contador auxiliar
        q++
        if (q > 3) q = 0
      }
    }
    //Volvemos a llamar a la función con las posiciones que hemos almacenado
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


//Function that locks the movement of the pipes when user wins or loses
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

//¯\_(ツ)_/¯
Game.prototype.cheat = function() {

}


//Sounds
//Function that plays the rotate sound
Game.prototype.rotateSound = function() {
  var rotateAudio = new Audio('sounds/rotate.mp3')
  rotateAudio.play()
}

//Function that plays the win sound
Game.prototype.winSound = function() {
  var winAudio1 = new Audio ('sounds/winFanfare.mp3')
  var winAudio2 = new Audio('sounds/pouringBeer.mp3')
  winAudio1.play()
  setTimeout(function() {
    winAudio2.play()
  }, 1500)
}

Game.prototype.loseSound = function() {
  var loseSound = new Audio('sounds/loseSound.mp3')
  loseSound.play()
}
