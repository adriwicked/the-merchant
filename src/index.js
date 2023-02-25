import startGame from './game.js';

window.onload = init

function init() {
    startGame({ canvas: document.getElementById('game-canvas') })
}
