import cfg from './config.js'
import painter from './painter.js'
import getPerlinGrid from './perlin.js'

export default function buildMap(ctx) {
  const terrain = getPerlinGrid({
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
    for (let row = 0; row < terrain.length; row++) {
      for (let col = 0; col < terrain[0].length; col++) {
        let height = terrain[row][col]
        let color = getCellColor(height, row, col)
        drawCell(col, row, painter.randomizeColor(color))
      }
    }
  }

  function getCellColor(height, row, col) {
    const isWater = height <= cfg.MAP_RANGES.SHORE.SURFACE.MAX

    if (isWater) {
      const isSeashore = isShore(row, col, height => height > cfg.MAP_RANGES.SHORE.SURFACE.MAX)

      if (isSeashore) {
        return cfg.MAP_RANGES.SHORE.SURFACE.COLOR
      }

      return cfg.MAP_RANGES.BASE.MEDIUM.COLOR
    }

    const isBeach = isShore(row, col, height => height <= cfg.MAP_RANGES.SHORE.SURFACE.MAX)
    if (isBeach) {
      return cfg.MAP_RANGES.SHORE.SAND.COLOR
    }

    const range = Object.values(cfg.MAP_RANGES.BASE)
      .find(r => height <= r.MAX)

    return range.COLOR
  }

  function isShore(row, col, checkFunction) {
    const top = row > 0 ? terrain[row - 1][col] : null
    const right = col < terrain[0].length - 1 ? terrain[row][col + 1] : null
    const bottom = row < terrain.length - 1 ? terrain[row + 1][col] : null
    const left = col > 0 ? terrain[row][col - 1] : null

    return [top, right, bottom, left]
      .filter(height => height !== null)
      .some(checkFunction)
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
    const vectors = terrain.vectors

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
