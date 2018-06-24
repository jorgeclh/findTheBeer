function Pipe(type) {
  this.type = type
  this.locked = false
}

//Method that rotates a pipe to the left
Pipe.prototype.rotateLeft = function() {
  if (!this.isLocked()) {
    this.type = this.type.push(this.type.shift())
  }
}

//Method that rotates a pipe to the right
Pipe.prototype.rotateRight = function() {
  if (!this.isLocked()) {
    this.type = this.type.unshift(this.type.pop())
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

//Method that returns the inner html of a pipe
Pipe.prototype.draw = function(x, y) {
  var pipeDiv = $('<div/>').attr('id', x + '-' + y)
  if (this.type.every(function(v, i) {return v === [0, 0, 0, 1][i]})) {
    pipeDiv.addClass('pipe end-left')
  } else if (this.type.every(function(v, i) {return v === [0, 0, 1, 0][i]})) {
    pipeDiv.addClass('pipe end-bottom')
  } else if (this.type.every(function(v, i) {return v === [0, 1, 0, 0][i]})) {
    pipeDiv.addClass('pipe end-right')
  } else if (this.type.every(function(v, i) {return v === [1, 0, 0, 0][i]})) {
    pipeDiv.addClass('pipe end-top')
  } else if (this.type.every(function(v, i) {return v === [0, 1, 0, 1][i]})) {
    pipeDiv.addClass('pipe line-horizontal')
  } else if (this.type.every(function(v, i) {return v === [1, 0, 1, 0][i]})) {
    pipeDiv.addClass('pipe line-vertical')
  } else if (this.type.every(function(v, i) {return v === [0, 0, 1, 1][i]})) {
    pipeDiv.addClass('pipe curve-bottom-left')
  } else if (this.type.every(function(v, i) {return v === [0, 1, 1, 0][i]})) {
    pipeDiv.addClass('pipe curve-bottom-right')
  } else if (this.type.every(function(v, i) {return v === [1, 1, 0, 0][i]})) {
    pipeDiv.addClass('pipe curve-top-right')
  } else if (this.type.every(function(v, i) {return v === [1, 0, 0, 1][i]})) {
    pipeDiv.addClass('pipe curve-top-left')
  } else if (this.type.every(function(v, i) {return v === [0, 1, 1, 1][i]})) {
    pipeDiv.addClass('pipe t-bottom')
  } else if (this.type.every(function(v, i) {return v === [1, 1, 1, 0][i]})) {
    pipeDiv.addClass('pipe t-right')
  } else if (this.type.every(function(v, i) {return v === [1, 1, 0, 1][i]})) {
    pipeDiv.addClass('pipe t-top')
  } else if (this.type.every(function(v, i) {return v === [1, 0, 1, 1][i]})) {
    pipeDiv.addClass('pipe t-left')
  } else if (this.type.every(function(v, i) {return v === [1, 1, 1, 1][i]})) {
    pipeDiv.addClass('pipe cross')
  }
  return pipeDiv.html(this.type)
}
