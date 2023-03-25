import buildGame from './game.js';

let game = null

window.onload = () => {
  const canvas = document.getElementById('game-canvas')
  game = buildGame(canvas)
  document.querySelector('#regenerate-map')
    .addEventListener('click', game.regenerateMap)
  window.requestAnimationFrame(gameLoop)
}

const gameLoop = time => {
  game.update(time)
  window.requestAnimationFrame(gameLoop)
}