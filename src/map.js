import cfg from './config.js'
import painter from './painter.js'
import getPerlinGrid from './perlin.js'

export default function buildMap() {
  const heightGrid = getPerlinGrid({
    gridWidth: cfg.MAP_WIDTH,
    gridHeight: cfg.MAP_HEIGHT,
    resolution: cfg.PERLIN_CELL_RESOLUTION,
  })

  let terrainGrid = getTerrainCells(heightGrid)
  terrainGrid = generateSeaShores(terrainGrid)

  function getTerrainCells(heightGrid) {
    const cells = []

    for (let row = 0; row < heightGrid.length; row++) {
      cells[row] = []
      for (let col = 0; col < heightGrid[0].length; col++) {
        const height = heightGrid[row][col]
        cells[row][col] = Object.values(cfg.MAP_RANGES.BASE)
          .find(range => height <= range.MAX)
      }
    }

    return cells
  }

  function generateSeaShores(terrainGrid) {
    return terrainGrid.map((rowArr, row) => rowArr.map((cell, col) => {
      const isWater = cell.SYMBOL === cfg.MAP_RANGES.BASE.MEDIUM_WATER.SYMBOL
      if (isWater) {
        if (hasNearCell(row, col, cfg.MAP_RANGES.BASE.LOW_GRASS)) {
          return cfg.MAP_RANGES.SHORE.SEA_SHORE
        }
      }

      const isLowGrass = cell.SYMBOL === cfg.MAP_RANGES.BASE.LOW_GRASS.SYMBOL
      if (isLowGrass) {
        if (hasNearCell(row, col, cfg.MAP_RANGES.BASE.MEDIUM_WATER)) {
          return cfg.MAP_RANGES.SHORE.BEACH_SAND
        }
      }

      return cell
    }))
  }

  function draw() {
    painter.clearCanvas()
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
    for (let row = 0; row < terrainGrid.length; row++) {
      for (let col = 0; col < terrainGrid[0].length; col++) {
        const cell = terrainGrid[row][col]
        drawCell(col, row, painter.randomizeColor(cell.COLOR))
      }
    }
  }

  function hasNearCell(row, col, cellType) {
    const top = row > 0 ? terrainGrid[row - 1][col] : null
    const right = col < terrainGrid[0].length - 1 ? terrainGrid[row][col + 1] : null
    const bottom = row < terrainGrid.length - 1 ? terrainGrid[row + 1][col] : null
    const left = col > 0 ? terrainGrid[row][col - 1] : null

    return [top, right, bottom, left]
      .filter(nearCell => nearCell !== null)
      .some(nearCell => nearCell.SYMBOL === cellType.SYMBOL)
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
    const vectors = heightGrid.vectors

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
