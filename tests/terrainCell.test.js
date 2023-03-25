import buildTerrainCell from "../src/terrainCell";
import cfg from "../src/config";

test('its water cell', () => {
    const terrainCell = buildTerrainCell(-1)
    expect(terrainCell.isWater()).toBe(true)
})

test('its grass cell', () => {
    const terrainCell = buildTerrainCell(0.11)
    expect(terrainCell.isWater()).toBe(true)
})

test('it can be built indicating type', () => {
    const terrainCell = buildTerrainCell(cfg.MAP_RANGES.SHORE.SEA_SHORE)
    expect(terrainCell.isWater()).toBe(true)
})