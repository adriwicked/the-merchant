import cfg from './config.js'
import getPerlinGrid from './perlin.js'
import painter from './painter.js'
import buildMapView from './mapView.js'
import buildTerrainCell from './terrainCell.js'

const buildMap = () => {
  const getTerrainCells = (heightGrid) => {
    const cells = []

    for (let row = 0; row < heightGrid.length; row++) {
      cells[row] = []
      for (let col = 0; col < heightGrid[0].length; col++) {
        cells[row][col] = buildTerrainCell({ height: heightGrid[row][col] })
      }
    }

    return cells
  }

  const getRangeByHeight = (height) => {
    return Object.values(cfg.MAP_RANGES.BASE)
      .find(range => height <= range.MAX)
  }

  const getRangeWithRandColor = (range) => {
    const newColor = painter.getRandColorTweak(range.COLOR)
    return Object.assign({}, range, { COLOR: newColor })
  }

  const generateSeaShores = (terrainGrid) => {
    return terrainGrid.map((rowArr, row) => rowArr.map((cell, col) => {
      if (cell.isWater()) {
        if (hasNearCell(row, col, cfg.MAP_RANGES.BASE.LOW_GRASS)) {
          return buildTerrainCell({ type: cfg.MAP_RANGES.SHORE.SEA_SHORE })
        }
      }

      if (cell.isLowGrass()) {
        if (hasNearCell(row, col, cfg.MAP_RANGES.BASE.MEDIUM_WATER)) {
          return buildTerrainCell({ type: cfg.MAP_RANGES.SHORE.BEACH_SAND })
        }
      }

      return cell
    }))
  }

  const hasNearCell = (row, col, cellType) => {
    const top = row > 0 ? terrainGrid[row - 1][col] : null
    const right = col < terrainGrid[0].length - 1 ? terrainGrid[row][col + 1] : null
    const bottom = row < terrainGrid.length - 1 ? terrainGrid[row + 1][col] : null
    const left = col > 0 ? terrainGrid[row][col - 1] : null

    return [top, right, bottom, left]
      .filter(nearCell => nearCell !== null)
      .some(nearCell => nearCell.getTerrainType() === cellType.SYMBOL)
  }

  const heightGrid = getPerlinGrid(
    cfg.MAP_WIDTH,
    cfg.MAP_HEIGHT,
    cfg.PERLIN_CELL_RESOLUTION
  )

  let terrainGrid = getTerrainCells(heightGrid)
  terrainGrid = generateSeaShores(terrainGrid)
  const mapView = buildMapView()

  return {
    getTerrainGrid: () => terrainGrid,
    drawMap: () => mapView.draw(terrainGrid)
  }
}

export default buildMap