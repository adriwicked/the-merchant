import buildMap from './map.js'
import cfg from './config.js'

export let ctx

const buildGame = canvas => {
  let lastTime = 0
  let elapsedTime = 0

  canvas.width = cfg.CANVAS_WIDTH
  canvas.height = cfg.CANVAS_HEIGHT

  ctx = canvas.getContext('2d')

  let map = buildMap()
  map.drawMap()

  const regenerateMap = () => {
    map = buildMap()
    map.drawMap()
  }

  const update = (time) => {
    if (lastTime == 0) {
      lastTime = time
    }

    const deltaTime = time - lastTime
    lastTime = time
    elapsedTime += deltaTime

    if (elapsedTime >= cfg.ANIM_DURATION) {
      map.drawMap()
      elapsedTime = 0
      lastTime = 0
    }
  }

  return {
    regenerateMap,
    update
  }
}


export default buildGame