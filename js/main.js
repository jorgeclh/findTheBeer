window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    startGame();
  }

  function startGame() {
    var game = new Game();
    game.newGame()
  }
}
