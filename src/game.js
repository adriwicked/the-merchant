import buildMap from './map.js'
import cfg from './config.js'

export let ctx

export default function buildGame(canvas) {
  canvas.width = cfg.CANVAS_WIDTH
  canvas.height = cfg.CANVAS_HEIGHT
  ctx = canvas.getContext('2d')

  let map = buildMap()
  map.draw()

  function regenerateMap() {
    map = buildMap()
    map.draw()
  }

  let lastTime = 0
  let elapsedTime = 0
  function update(time) {
    if (lastTime == 0) {
      lastTime = time
    }

    const deltaTime = time - lastTime
    lastTime = time
    elapsedTime += deltaTime

    if (elapsedTime >= cfg.ANIM_DURATION) {
      map.draw()
      elapsedTime = 0
      lastTime = 0
    }
  }

  return {
    regenerateMap,
    update
  }
}
