import game from './game.js';

window.onload = init

function init() {
    game.init({ canvas: document.getElementById('game-canvas') })
}
