import cfg from './config.js'
import painter from './painter.js'
import getPerlinInfo from './perlin.js'

export default function buildMap(ctx) {
  let map = new Array(cfg.MAP_HEIGHT).fill(0)
    .map(() => new Array(cfg.MAP_WIDTH).fill(0))

  const perlinInfo = getPerlinInfo({
    gridWidth: cfg.MAP_WIDTH,
    gridHeight: cfg.MAP_HEIGHT,
    resolution: cfg.PERLIN_CELL_RESOLUTION,
  })

  function draw() {
    painter.clearCanvas(ctx)

    drawMapBorder()

    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[0].length; col++) {
        let value = perlinInfo.values[row][col] * 100
        let falta = 100 - value
        let lleva = 200 - falta
        let ratio = lleva / 200
        let perc = ratio * 100
        const color = `hsl(0, 0%, ${perc}%)`
        drawCell(col, row, color)
        // drawCell(col, row, cfg.COLORS.CELL)
      }
    }

    drawPerlinVectors()
  }

  function drawCell(x, y, color) {
    const cellRect = {
      x: cfg.getMapPosition().x + (cfg.CELL_SIZE + cfg.CELL_SEPARATION) * x,
      y: cfg.getMapPosition().y + (cfg.CELL_SIZE + cfg.CELL_SEPARATION) * y,
      width: cfg.CELL_SIZE,
      height: cfg.CELL_SIZE
    }

    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillRect(cellRect.x, cellRect.y, cellRect.width, cellRect.height)
    ctx.closePath()
  }

  function drawMapBorder() {
    const outterBorderRect = cfg.getOutterBorderRect()
    ctx.fillStyle = cfg.COLORS.CELL
    ctx.beginPath()
    ctx.fillRect(
      outterBorderRect.x,
      outterBorderRect.y,
      outterBorderRect.width,
      outterBorderRect.height
    )

    const innerBorderRect = cfg.getInnerBorderRect()
    ctx.fillStyle = cfg.COLORS.BACKGROUND
    ctx.beginPath()
    ctx.fillRect(
      innerBorderRect.x,
      innerBorderRect.y,
      innerBorderRect.width,
      innerBorderRect.height
    )
  }

  function drawPerlinVectors() {
    const vectors = perlinInfo.vectors

    for (let y = 0; y < vectors.length; y++) {
      for (let x = 0; x < vectors[0].length; x++) {
        const vector = vectors[y][x]
        drawVectorInMap(
          {
            x: x * cfg.PERLIN_CELL_RESOLUTION,
            y: y * cfg.PERLIN_CELL_RESOLUTION
          },
          vector
        )
      }
    }
  }

  function drawVectorInMap(mapCoords, vector) {
    const origin = {
      x: cfg.getMapPosition().x + (cfg.CELL_SIZE + cfg.CELL_SEPARATION) * mapCoords.x,
      y: cfg.getMapPosition().y + (cfg.CELL_SIZE + cfg.CELL_SEPARATION) * mapCoords.y
    }

    const terminal = {
      x: origin.x + vector.x * cfg.CELL_SIZE,
      y: origin.y + vector.y * cfg.CELL_SIZE
    }

    painter.drawVector(origin, terminal)
  }

  return {
    draw
  }
}
