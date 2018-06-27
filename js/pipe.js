function Pipe(type) {
  this.type = type
  this.locked = false
  this.active = false
  this.origin = false
  this.goal = false
}

//Function that rotates a pipe
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

//Function that activates a pipe
Pipe.prototype.activate = function() {
  this.active = true
}

//Function that deactivates a pipe
Pipe.prototype.deactivate = function() {
  this.active = false
}

//Function that returns if a pipe is active or not
Pipe.prototype.isActive = function() {
  return this.active
}


//Method that returns the inner html of a pipe
Pipe.prototype.draw = function(x, y) {
  var pipeDiv = $('<div/>').attr('id', x + '-' + y)
  if (this.type.every(function(v, i) {return v === pipeTypes['end-left'][i]})) {
    pipeDiv.addClass('pipe end left')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['end-bottom'][i]})) {
    pipeDiv.addClass('pipe end bottom')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['end-right'][i]})) {
    pipeDiv.addClass('pipe end right')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['end-top'][i]})) {
    pipeDiv.addClass('pipe end top')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['line-horizontal'][i]})) {
    pipeDiv.addClass('pipe line horizontal')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['line-vertical'][i]})) {
    pipeDiv.addClass('pipe line vertical')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['curve-bottom-left'][i]})) {
    pipeDiv.addClass('pipe curve bottom left')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['curve-bottom-right'][i]})) {
    pipeDiv.addClass('pipe curve bottom right')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['curve-top-right'][i]})) {
    pipeDiv.addClass('pipe curve top right')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['curve-top-left'][i]})) {
    pipeDiv.addClass('pipe curve top left')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['t-bottom'][i]})) {
    pipeDiv.addClass('pipe t bottom')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['t-right'][i]})) {
    pipeDiv.addClass('pipe t right')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['t-top'][i]})) {
    pipeDiv.addClass('pipe t top')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['t-left'][i]})) {
    pipeDiv.addClass('pipe t left')
  } else if (this.type.every(function(v, i) {return v === pipeTypes['cross'][i]})) {
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


var pipeTypes = {
  'end-left': [0, 0, 0, 1],
  'end-bottom': [0, 0, 1, 0],
  'end-right': [0, 1, 0, 0],
  'end-top': [1, 0, 0, 0],
  'line-horizontal': [0, 1, 0, 1],
  'line-vertical': [1, 0, 1, 0],
  'curve-bottom-left': [0, 0, 1, 1],
  'curve-bottom-right': [0, 1, 1, 0],
  'curve-top-right': [1, 1, 0, 0],
  'curve-top-left': [1, 0, 0, 1],
  't-bottom': [0, 1, 1, 1],
  't-right': [1, 1, 1, 0],
  't-top': [1, 1, 0, 1],
  't-left': [1, 0, 1, 1],
  'cross': [1, 1, 1, 1]
}
