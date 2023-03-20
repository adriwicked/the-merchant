export class Map {
  constructor() {
    this.width = 45
    this.height = 45
    this.resolution = 15
    this.heightMap = new Perlin(this.width, this.height, this.resolution)
    this.terrain = [[]]
  }

  
}