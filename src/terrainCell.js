import cfg from './config.js'
import painter from './painter.js'

const buildTerrainCell = ({ height, type }) => {
  const setTerrainTypeByHeight = height => {
    return Object.values(cfg.MAP_RANGES.BASE)
      .find(range => height <= range.MAX)
  }

  const terrainType = height ? setTerrainTypeByHeight(height) : type

  const randomizedColor = painter.getRandColorTweak(terrainType.COLOR)
  const waterRangesSymbols = [
    cfg.MAP_RANGES.BASE.DEEP_WATER.SYMBOL,
    cfg.MAP_RANGES.BASE.MEDIUM_WATER.SYMBOL,
    cfg.MAP_RANGES.SHORE.SEA_SHORE.SYMBOL,
  ]

  return {
    getColor: () => randomizedColor,
    isWater: () => waterRangesSymbols.some(s => s === terrainType.SYMBOL),
    isLowGrass: () => terrainType.SYMBOL === cfg.MAP_RANGES.BASE.LOW_GRASS.SYMBOL,
    getTerrainType: () => terrainType.SYMBOL
  }
}

export default buildTerrainCell