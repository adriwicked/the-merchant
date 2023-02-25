import buildMap from './map.js'
import config from './config.js'

export default function startGame({ canvas }) {
  canvas.width = config.CANVAS_WIDTH
  canvas.height = config.CANVAS_HEIGHT
  const ctx = canvas.getContext('2d')

  const map = buildMap(ctx)

  map.draw()
}

