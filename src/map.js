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
    drawMap()
  }

  function drawMapBorder() {
    const outterBorderRect = cfg.getOutterBorderRect()
    painter.drawRect({
      x: outterBorderRect.x,
      y: outterBorderRect.y,
      width: outterBorderRect.width,
      height: outterBorderRect.height,
      color: cfg.COLORS.BOARD.BORDER
    })

    const innerBorderRect = cfg.getInnerBorderRect()
    painter.drawRect({
      x: innerBorderRect.x,
      y: innerBorderRect.y,
      width: innerBorderRect.width,
      height: innerBorderRect.height,
      color: cfg.COLORS.BOARD.BACKGROUND
    })
  }

  function drawMap() {
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[0].length; col++) {
        let height = perlinInfo.values[row][col]
        let color = getHeightColor(height)
        color = painter.randomizeColor(color)
        drawCell(col, row, color)
      }
    }
  }

  function getHeightColor(height) {
    const range = cfg.MAP_COLOR_RANGES
      .find(r => height <= r.MAX)

    return range.COLOR
  }

  function drawCell(x, y, color) {
    painter.drawRect({
      x: cfg.getMapPosition().x + (cfg.CELL_SIZE + cfg.CELL_SEPARATION) * x,
      y: cfg.getMapPosition().y + (cfg.CELL_SIZE + cfg.CELL_SEPARATION) * y,
      width: cfg.CELL_SIZE,
      height: cfg.CELL_SIZE,
      color
    })
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
      x: origin.x + vector.x * cfg.CELL_SIZE * 3,
      y: origin.y + vector.y * cfg.CELL_SIZE * 3
    }

    painter.drawVector(origin, terminal)
  }

  return {
    draw
  }
}
