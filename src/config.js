export default {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    CELL_SIZE: 11,
    CELL_SEPARATION: 2,
    BORDER_HEADER: 25,
    BORDER_WIDTH: 3,
    MAP_WIDTH: 41,
    MAP_HEIGHT: 41,
    PERLIN_CELL_RESOLUTION: 15,
    MAP_COLOR_RANGES: [
        { MAX: -0.4, COLOR: '#256299' }, // DEEP
        { MAX: -0.03, COLOR: '#2375b4' }, // MEDIUM
        { MAX: 0.02, COLOR: '#4699de' }, // SURFACE
        { MAX: 0.09, COLOR: '#ab976a' }, // SAND
        { MAX: 0.2, COLOR: '#367147' }, // DARK LOW GRASS
        { MAX: 0.4, COLOR: '#457950' }, // LIGHT HIGH GRASS
        { MAX: 0.5, COLOR: '#514635' }, // ROCK
        { MAX: 1, COLOR: '#f4f0e8' }, // SNOW
    ],
    COLORS: {
        BOARD: {
            BACKGROUND: '#333',
            BORDER: '#777'
        }
    },
    getOutterBorderRect() {
        let mapSize = this.getMapSize()
        return {
            x: this.CANVAS_WIDTH / 2
                - mapSize.width / 2
                - this.CELL_SEPARATION
                - this.BORDER_WIDTH,
            y: this.CANVAS_HEIGHT / 2
                - mapSize.height / 2
                - this.CELL_SEPARATION
                - this.BORDER_WIDTH
                - this.BORDER_HEADER,
            width: mapSize.width + this.CELL_SEPARATION * 2 + this.BORDER_WIDTH * 2,
            height: mapSize.height + this.CELL_SEPARATION * 2 + this.BORDER_WIDTH * 2 + this.BORDER_HEADER
        }
    },
    getInnerBorderRect() {
        let mapSize = this.getMapSize()
        return {
            x: this.CANVAS_WIDTH / 2 - mapSize.width / 2 - this.CELL_SEPARATION,
            y: this.CANVAS_HEIGHT / 2 - mapSize.height / 2 - this.CELL_SEPARATION,
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
