import cfg from './config.js'
import painter from './painter.js'

const buildMapView = () => {
  const draw = map => {
    painter.clearCanvas()
    drawMapBorder()
    drawMap(map)
  }

  const drawMapBorder = () => {
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

  const drawMap = map => {
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[0].length; col++) {
        const cell = map[row][col]
        if (cell.isWater()) {
          drawCell(col, row, painter.getRandColorTweak(cell.getColor()))
        } else {
          drawCell(col, row, cell.getColor())
        }
      }
    }
  }

  const drawCell = (x, y, color) => {
    painter.drawRect({
      x: cfg.getMapPosition().x + (cfg.CELL_SIZE + cfg.CELL_SEPARATION) * x,
      y: cfg.getMapPosition().y + (cfg.CELL_SIZE + cfg.CELL_SEPARATION) * y,
      width: cfg.CELL_SIZE,
      height: cfg.CELL_SIZE,
      color
    })
  }

  return {
    draw
  }
}

export default buildMapView