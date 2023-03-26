import buildGame from './game.js';

(function () {
  let game

  window.onload = init

  function init() {
    const canvas = document.getElementById('game-canvas')
    game = buildGame(canvas)

    document.querySelector('#regenerate-map')
      .addEventListener('click', game.regenerateMap)
      
    window.requestAnimationFrame(gameLoop)
  }

  function gameLoop(time) {
    game.update(time)
    window.requestAnimationFrame(gameLoop)
  }
})()