export default {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    CELL_SIZE: 11,
    CELL_SEPARATION: 2,
    BORDER_HEADER: 25,
    BORDER_WIDTH: 3,
    MAP_WIDTH: 41,
    MAP_HEIGHT: 41,
    PERLIN_CELL_RESOLUTION: 10,
    COLORS: {
        BACKGROUND: '#333',
        BORDER: 'red',
        CELL: '#777777',
        WATER: ['#2f83c9', '#2375b4', '#256299'],
        GRASS: ['#428d48', '#5cb35d', '#4fa254'],
        MOUNTAIN: ['#8e7c6a', '#514635', '#cfcfcf'],
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
