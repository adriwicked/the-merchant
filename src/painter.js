import config from './config.js'

let ctx
let mapPosition = { x: 0, y: 0 }
let colors = {
    background: '#282828',
    border: 'red',
    cell: '#777777'
}

function init(newCtx) {
    ctx = newCtx
    mapPosition = config.getMapPosition()
}

function clearCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawGame(map) {
    clearCanvas()
    drawBackground()
    drawMapBorder(map)
    drawMap(map)
}

function drawMapBorder(map) {
    const outterBorderRect = config.getOutterBorderRect()
    ctx.fillStyle = colors.cell
    ctx.beginPath()
    ctx.fillRect(
        outterBorderRect.x,
        outterBorderRect.y,
        outterBorderRect.width,
        outterBorderRect.height
    )

    const innerBorderRect = config.getInnerBorderRect()
    ctx.fillStyle = colors.background
    ctx.beginPath()
    ctx.fillRect(
        innerBorderRect.x,
        innerBorderRect.y,
        innerBorderRect.width,
        innerBorderRect.height
    )
}

function drawBackground() {
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawMap(map) {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            drawCellBackground(col, row, colors.cell)
        }
    }
}

function drawCellBackground(x, y, color) {
    const cellRect = {
        x: mapPosition.x + (config.CELL_SIZE + config.CELL_SEPARATION) * x,
        y: mapPosition.y + (config.CELL_SIZE + config.CELL_SEPARATION) * y,
        width: config.CELL_SIZE,
        height: config.CELL_SIZE
    }

    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillRect(cellRect.x, cellRect.y, cellRect.width, cellRect.height)
    ctx.closePath()
}

export default {
    init,
    clearCanvas,
    drawGame,
}
