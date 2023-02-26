import buildMap from './map.js'
import cfg from './config.js'

export let ctx = 0

function init({ canvas }) {
  canvas.width = cfg.CANVAS_WIDTH
  canvas.height = cfg.CANVAS_HEIGHT
  ctx = canvas.getContext('2d')

  const map = buildMap(ctx)

  map.draw()
}

export default {
  init
}