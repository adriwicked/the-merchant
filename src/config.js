export default {
    CANVAS_WIDTH: 600,
    CANVAS_HEIGHT: 600,
    CELL_SIZE: 10,
    CELL_SEPARATION: 2,
    BORDER_HEADER: 25,
    BORDER_WIDTH: 3,
    MAP_WIDTH: 45,
    MAP_HEIGHT: 45,
    PERLIN_CELL_RESOLUTION: 15,
    MAP_RANGES: {
        BASE: {
            DEEP_WATER: { MAX: -0.1, SYMBOL: 'DW', COLOR: '#256299' },
            MEDIUM_WATER: { MAX: 0.1, SYMBOL: 'MW', COLOR: '#2375b4' },
            LOW_GRASS: { MAX: 0.2, SYMBOL: 'LG', COLOR: '#457950' },
            HIGH_GRASS: { MAX: 0.3, SYMBOL: 'HG', COLOR: '#2d673e' },
            DIRT: { MAX: 0.4, SYMBOL: 'DT', COLOR: '#3F573A' },
            ROCK: { MAX: 1, SYMBOL: 'RC', COLOR: '#514635' },
        },
        SHORE: {
            SEA_SHORE: { MAX: 0.035, SYMBOL: 'SS', COLOR: '#4699de' },
            BEACH_SAND: { MAX: 0.09, SYMBOL: 'BS', COLOR: '#ab976a' },
        }
    },
    COLORS: {
        BOARD: {
            BACKGROUND: '#3c3c3c',
            BORDER: '#777'
        }
    },
    ANIM_DURATION: 1200,
    getOutterBorderRect() {
        let mapSize = this.getMapSize()
        const mapPos = this.getMapPosition()
        return {
            x: mapPos.x - this.CELL_SEPARATION - this.BORDER_WIDTH,
            y: mapPos.y - this.CELL_SEPARATION - this.BORDER_WIDTH - this.BORDER_HEADER,
            width: mapSize.width + this.CELL_SEPARATION * 2 + this.BORDER_WIDTH * 2,
            height: mapSize.height + this.CELL_SEPARATION * 2 + this.BORDER_WIDTH * 2 + this.BORDER_HEADER
        }
    },
    getInnerBorderRect() {
        let mapSize = this.getMapSize()
        const mapPos = this.getMapPosition()
        return {
            x: mapPos.x - this.CELL_SEPARATION,
            y: mapPos.y - this.CELL_SEPARATION,
            width: mapSize.width + this.CELL_SEPARATION * 2,
            height: mapSize.height + this.CELL_SEPARATION * 2
        }
    },
    getMapSize() {
        return {
            width: (this.CELL_SIZE + this.CELL_SEPARATION) * this.MAP_WIDTH - this.CELL_SEPARATION,
            height: (this.CELL_SIZE + this.CELL_SEPARATION) * this.MAP_HEIGHT - this.CELL_SEPARATION
        }
    },
    getTotalCellSize() {
        return this.CELL_SIZE + this.CELL_SEPARATION
    },
    getMapPosition() {
        let mapSize = this.getMapSize()
        return {
            x: this.CANVAS_WIDTH / 2 - mapSize.width / 2,
            y: this.CANVAS_HEIGHT / 2 - mapSize.height / 2
        }
    }
}
