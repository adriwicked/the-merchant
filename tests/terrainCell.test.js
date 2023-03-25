import buildTerrainCell from "../src/terrainCell";

test('its water cell', () => {
    const terrainCell = buildTerrainCell(-1)
    expect(terrainCell.isWater()).toBe(true)
})

test('its grass cell', () => {
    const terrainCell = buildTerrainCell(0.11)
    expect(terrainCell.isWater()).toBe(true)
})