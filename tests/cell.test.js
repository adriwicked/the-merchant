import buildCell from "../src/cell";
import cfg from "../src/config";

test('its water cell', () => {
  const terrainCell = buildCell(-1)
  expect(terrainCell.isWater()).toBe(true)
})

test('its grass cell', () => {
  const terrainCell = buildCell(0.11)
  expect(terrainCell.isLowGrass()).toBe(true)
})

test('it can be built indicating type', () => {
  const terrainCell = buildCell(cfg.MAP_RANGES.SHORE.SEA_SHORE)
  expect(terrainCell.getTerrainSymbol()).toBe('SS')
})