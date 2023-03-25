import buildTerrainCell from "../src/terrainCell";
import cfg from "../src/config";

test('its water cell', () => {
    const terrainCell = buildTerrainCell({ height: -1 })
    expect(terrainCell.isWater()).toBe(true)
})

test('its grass cell', () => {
    const terrainCell = buildTerrainCell({ height: 0.11 })
    expect(terrainCell.isLowGrass()).toBe(true)
})

test('it can be built indicating type', () => {
    const terrainCell = buildTerrainCell({
        type: cfg.MAP_RANGES.SHORE.SEA_SHORE
    })
    expect(terrainCell.isWater()).toBe(true)
})