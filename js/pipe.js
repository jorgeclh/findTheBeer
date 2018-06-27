function Pipe(type) {
  this.type = type
  this.locked = false
  this.active = false
  this.origin = false
  this.goal = false
}


Pipe.prototype.rotate = function(rotation) {
  if (!this.isLocked()) {
    if (arguments[0] != undefined) {
      if (arguments[0] == 'left') {
        this.type.push(this.type.shift())
      } else if (arguments[0] == 'right') {
        this.type.unshift(this.type.pop())
      }
    }
  }
}

//Called when beer reaches the pipe and it cant be moved
Pipe.prototype.lock = function() {
  this.locked = true
}

//Method that returns if a pipe is locked or not
Pipe.prototype.isLocked = function() {
  return this.locked
}

Pipe.prototype.activate = function() {
  this.active = true
}

Pipe.prototype.deactivate = function() {
  this.active = false
}

Pipe.prototype.isActive = function() {
  return this.active
}


//Method that returns the inner html of a pipe
Pipe.prototype.draw = function(x, y) {
  var pipeDiv = $('<div/>').attr('id', x + '-' + y)
  // switch (pipeTypes[this.type]) {
  //   case 'end-left':
  //   console.log('yep')
  // }


  if (this.type.every(function(v, i) {return v === [0, 0, 0, 1][i]})) {
    pipeDiv.addClass('pipe end left')
  } else if (this.type.every(function(v, i) {return v === [0, 0, 1, 0][i]})) {
    pipeDiv.addClass('pipe end bottom')
  } else if (this.type.every(function(v, i) {return v === [0, 1, 0, 0][i]})) {
    pipeDiv.addClass('pipe end right')
  } else if (this.type.every(function(v, i) {return v === [1, 0, 0, 0][i]})) {
    pipeDiv.addClass('pipe end top')
  } else if (this.type.every(function(v, i) {return v === [0, 1, 0, 1][i]})) {
    pipeDiv.addClass('pipe line horizontal')
  } else if (this.type.every(function(v, i) {return v === [1, 0, 1, 0][i]})) {
    pipeDiv.addClass('pipe line vertical')
  } else if (this.type.every(function(v, i) {return v === [0, 0, 1, 1][i]})) {
    pipeDiv.addClass('pipe curve bottom left')
  } else if (this.type.every(function(v, i) {return v === [0, 1, 1, 0][i]})) {
    pipeDiv.addClass('pipe curve bottom right')
  } else if (this.type.every(function(v, i) {return v === [1, 1, 0, 0][i]})) {
    pipeDiv.addClass('pipe curve top right')
  } else if (this.type.every(function(v, i) {return v === [1, 0, 0, 1][i]})) {
    pipeDiv.addClass('pipe curve top left')
  } else if (this.type.every(function(v, i) {return v === [0, 1, 1, 1][i]})) {
    pipeDiv.addClass('pipe t bottom')
  } else if (this.type.every(function(v, i) {return v === [1, 1, 1, 0][i]})) {
    pipeDiv.addClass('pipe t right')
  } else if (this.type.every(function(v, i) {return v === [1, 1, 0, 1][i]})) {
    pipeDiv.addClass('pipe t top')
  } else if (this.type.every(function(v, i) {return v === [1, 0, 1, 1][i]})) {
    pipeDiv.addClass('pipe t left')
  } else if (this.type.every(function(v, i) {return v === [1, 1, 1, 1][i]})) {
    pipeDiv.addClass('pipe cross')
  }
  if (this.isLocked()) {
    pipeDiv.addClass('blocked')
  }
  if (this.isActive()) {
    pipeDiv.addClass('active')
  }
  if (this.origin) {
    pipeDiv.addClass('origin')
  }
  if (this.goal) {
    pipeDiv.addClass('goal')
  }
  return pipeDiv
}


// var pipeTypes = {
//   [0, 0, 0, 1]: 'end-left',
//   [0, 0, 1, 0]: 'end-bottom',
//   [0, 1, 0, 0]: 'end-right',
//   [1, 0, 0, 0]: 'END_TOP'
// }
