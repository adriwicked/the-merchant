import config from './config.js'
import painter from './painter.js'
import buildPerlin from './perlin.js'

export default function buildMap(ctx) {
  let map = new Array(config.MAP_HEIGHT).fill(0)
    .map(() => new Array(config.MAP_WIDTH).fill(0))

  const mapPosition = config.getMapPosition()
  const perlin = buildPerlin({
    gridWidth: config.MAP_WIDTH,
    gridHeight: config.MAP_HEIGHT,
    resolution: config.PERLIN_CELL_RESOLUTION,
  })

  function draw() {
    painter.clearCanvas(ctx)

    drawMapBorder()

    const values = perlin.getValues()
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[0].length; col++) {
        let value = values[row][col] * 100
        let falta = 100 - value
        let lleva = 200 - falta
        let ratio = lleva / 200
        let perc = ratio * 100
        const color = `hsl(0, 0%, ${perc}%)`
        drawCell(col, row, color)
      }
    }

    drawPerlinVectors()
  }

  function drawCell(x, y, color) {
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

  function drawMapBorder() {
    const outterBorderRect = config.getOutterBorderRect()
    ctx.fillStyle = config.COLORS.CELL
    ctx.beginPath()
    ctx.fillRect(
      outterBorderRect.x,
      outterBorderRect.y,
      outterBorderRect.width,
      outterBorderRect.height
    )

    const innerBorderRect = config.getInnerBorderRect()
    ctx.fillStyle = config.COLORS.BACKGROUND
    ctx.beginPath()
    ctx.fillRect(
      innerBorderRect.x,
      innerBorderRect.y,
      innerBorderRect.width,
      innerBorderRect.height
    )
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

    const terminal = {
      x: origin.x + vector.x * config.CELL_SIZE,
      y: origin.y + vector.y * config.CELL_SIZE
    }

    painter.drawVector(ctx, origin, terminal)
  }

  return {
    draw
  }
}
