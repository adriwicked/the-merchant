import config from './config.js'
import perlin from './perlin.js'

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
    perlin.init(
        config.MAP_WIDTH,
        config.MAP_HEIGHT,
        config.PERLIN_CELL_RESOLUTION
    )
}

function clearCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawGame(map) {
    clearCanvas()
    drawBackground()
    drawMapBorder(map)
    drawMap(map)
    drawPerlinVectors()
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
    const values = perlin.getValues()
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            let value = values[row][col] * 100
            let falta = 100 - value
            let lleva = 200 - falta
            let ratio = lleva / 200
            let perc = ratio * 100
            const color = `hsl(0, 0%, ${perc}%)`
            drawCellBackground(col, row, color)
        }
    }
}

function drawPerlinVectors() {
    const vectors = perlin.getVectors()

    for (let row = 0; row < vectors.length; row++) {
        for (let col = 0; col < vectors[0].length; col++) {
            const vector = vectors[row][col]
            drawVectorInMap(
                {
                    x: col * config.PERLIN_CELL_RESOLUTION,
                    y: row * config.PERLIN_CELL_RESOLUTION
                },
                vector
            )
        }
    }
}

function drawVectorInMap(mapCoords, vector) {
    const origin = {
        x: mapPosition.x + (config.CELL_SIZE + config.CELL_SEPARATION) * mapCoords.x,
        y: mapPosition.y + (config.CELL_SIZE + config.CELL_SEPARATION) * mapCoords.y
    }

    const extreme = {
        x: origin.x + vector.x * config.CELL_SIZE,
        y: origin.y + vector.y * config.CELL_SIZE
    }

    ctx.beginPath()
    ctx.moveTo(origin.x, origin.y)
    ctx.lineTo(extreme.x, extreme.y)
    ctx.lineWidth = 2
    ctx.strokeStyle = 'red'
    ctx.stroke()
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
