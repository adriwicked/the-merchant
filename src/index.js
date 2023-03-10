import game from './game.js';

window.onload = init

function init() {
  document.querySelector('#regenerate-map').addEventListener('click', game.regenerateMap)
  game.init({ canvas: document.getElementById('game-canvas') })
  window.requestAnimationFrame(gameLoop)
}

function gameLoop(time) {
  game.update(time)
  window.requestAnimationFrame(gameLoop)
}
