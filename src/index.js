import buildMap from './map.js'
import painter from './painter.js'
import config from './config.js'

let cnv
let ctx

window.onload = init

function init() {
    cnv = document.getElementById('game-canvas');
    cnv.width = 800
    cnv.height = 600
    ctx = cnv.getContext('2d')

    const map = buildMap(config.MAP_WIDTH, config.MAP_HEIGHT)
    painter.init(ctx)
    painter.drawGame(map.getGrid())
}
