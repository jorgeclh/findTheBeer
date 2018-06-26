function Grid () {
  this.pies = []
}

//Method that returns the pipe contained at the grid coordinates given
Grid.prototype.getPipe = function(x, y) {
  if ((x >= 0 && x < this.pipes.length) && (y >= 0 && y < this.pipes[0].length)) {
    return this.pipes[x][y]
  } else {
    return undefined
  }
}


//Method that creates a board randomly
Grid.prototype.createBoard = function() {
  this.pipes = [[new Pipe([0, 1, 0, 1]), new Pipe([0, 0, 1, 1]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0])],
                [new Pipe([0, 1, 1, 0]), new Pipe([1, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0])],
                [new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0])],
                [new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0])],
                [new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([0, 1, 1, 0]), new Pipe([1, 1, 1, 1]), new Pipe([0, 1, 0, 1])]]
}

//Function that return whether or not a pipe is connected to another one given their cordinates and relative position
Grid.prototype.isConnected = function (x, y, position) {
  var neighbours = this.getNeighbours(x, y)
    if (neighbours[position] != undefined) {
      switch (position) {
        case 0:
          return neighbours[position].type[2] == 1
          break;
        case 1:
          return neighbours[position].type[3] == 1
          break;
        case 2:
          return neighbours[position].type[0] == 1
          break;
        case 3:
          return neighbours[position].type[1] == 1
          break;
      }
    } else {
      return false
    }
}


//Function that returns the pipes thar are next to the coordinates given on clockwise order, if there is no pipe it returns undefined instead
Grid.prototype.getNeighbours = function(x, y) {
  var ret = []

    if (y > 0) {
        ret.push(this.getPipe(parseInt(y)-1, x))
    } else {
      ret.push(undefined)
    }

    if (x < this.pipes.length) {
      ret.push(this.getPipe(y, parseInt(x)+1))
    } else {
      ret.push(undefined)
    }

    if (y < this.pipes[0].length) {
      ret.push(this.getPipe(parseInt(y)+1, x))
    } else {
      ret.push(undefined)
    }

    if (x > 0) {
      ret.push(this.getPipe(y, parseInt(x)-1))
    } else {
      ret.push(undefined)
    }

    return ret
}


//Function that returns the cordinates of the neighbour indicated
Grid.prototype.getRelativeCoordinate = function(x, y, direction) {
  var coords = []
    switch(direction) {
      case 0:
        coords.push(parseInt(x))
        coords.push(parseInt(y) - 1)
       break;
       case 1:
        coords.push(parseInt(x) + 1)
        coords.push(parseInt(y))
        break;
      case 2:
        coords.push(parseInt(x))
        coords.push(parseInt(y) + 1)
      break;
      case 3:
        coords.push(parseInt(x) - 1)
        coords.push(parseInt(y))
      break;
    }

    if (coords.every(function(e) { return parseInt(e) > -1 })) {
      return coords
    } else {
      return undefined
    }
}

// get connected neighbours/ get next pipes

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
