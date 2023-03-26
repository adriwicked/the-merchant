import cfg from './config.js'
import painter from './painter.js'

export default function buildCell(param) {
  function getTypeByHeight() {
    return Object.values(cfg.MAP_RANGES.BASE)
      .find(range => param <= range.MAX)
  }

  function isWater() {
    const waterTypes = [
      cfg.MAP_RANGES.BASE.DEEP_WATER.SYMBOL,
      cfg.MAP_RANGES.BASE.MEDIUM_WATER.SYMBOL,
      cfg.MAP_RANGES.SHORE.SEA_SHORE.SYMBOL,
    ]

    return waterTypes.some(s => s === terrainType.SYMBOL)
  }

  function isLowGrass() {
    return terrainType.SYMBOL === cfg.MAP_RANGES.BASE.LOW_GRASS.SYMBOL
  }

  const isHeightParam = typeof param === 'number'
  const terrainType = isHeightParam ? getTypeByHeight() : param
  const randomizedColor = painter.getRandColorTweak(terrainType.COLOR)

  return {
    getColor: () => randomizedColor,
    getTerrainType: () => terrainType.SYMBOL,
    isWater,
    isLowGrass,
  }
}
