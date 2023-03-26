import cfg from './config.js'
import getPerlinGrid from './perlin.js'
import buildCell from './cell.js'
import buildMapView from './mapView.js'

export default function buildMap() {
  function getTerrainGrid(heightGrid) {
    const cells = []

    for (let row = 0; row < heightGrid.length; row++) {
      cells[row] = []
      for (let col = 0; col < heightGrid[0].length; col++) {
        cells[row][col] = buildCell(heightGrid[row][col])
      }
    }

    return cells
  }

  function generateSeaShores(terrainGrid) {
    return terrainGrid.map((rowArr, row) => rowArr.map((cell, col) => {
      if (cell.isWater()) {
        if (hasNearCell(row, col, cfg.MAP_RANGES.BASE.LOW_GRASS.SYMBOL)) {
          return buildCell(cfg.MAP_RANGES.SHORE.SEA_SHORE)
        }
      }

      if (cell.isLowGrass()) {
        if (hasNearCell(row, col, cfg.MAP_RANGES.BASE.MEDIUM_WATER.SYMBOL)) {
          return buildCell(cfg.MAP_RANGES.SHORE.BEACH_SAND)
        }
      }

      return cell
    }))
  }

  function hasNearCell(row, col, cellSymbol) {
    const top = getCell(row - 1, col)
    const right = getCell(row, col + 1)
    const bottom = getCell(row + 1, col)
    const left = getCell(row, col - 1)

    return [top, right, bottom, left]
      .filter(nearCell => nearCell !== null)
      .some(nearCell => nearCell.getTerrainSymbol() === cellSymbol)
  }

  function getCell(row, col) {
    const rowLimit = terrainGrid.length - 1
    const colLimit = terrainGrid[0].length - 1

    if (row < 0 || row > rowLimit || col < 0 || col > colLimit) {
      return null
    }

    return terrainGrid[row][col]
  }

  const heightGrid = getPerlinGrid(
    cfg.MAP_WIDTH,
    cfg.MAP_HEIGHT,
    cfg.PERLIN_CELL_RESOLUTION
  )

  let terrainGrid = getTerrainGrid(heightGrid)
  terrainGrid = generateSeaShores(terrainGrid)
  const mapView = buildMapView()

  return {
    getTerrainGrid: () => terrainGrid,
    draw: () => mapView.draw(terrainGrid)
  }
}
