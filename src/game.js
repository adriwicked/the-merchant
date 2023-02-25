import buildMap from './map.js'
import config from './config.js'

export let ctx = 0

function init({ canvas }) {
  canvas.width = config.CANVAS_WIDTH
  canvas.height = config.CANVAS_HEIGHT
  ctx = canvas.getContext('2d')

  const map = buildMap(ctx)

  map.draw()
}

export default {
  init
}