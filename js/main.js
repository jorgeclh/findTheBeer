window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    startGame();
    document.getElementById('start-button').onclick = null
  }

  function startGame() {
    var game = new Game();
    game.newGame()

    console.log(game.grid.getNeighbours(0,0))
    console.log(game.grid.isConnected(0,0,1))
    console.log(game.grid.isConnected(0,0,2))
  }
}
