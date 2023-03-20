export class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.lastTime = 0
    this.elapsedTime = 0
    this.map = new Map()

  }

  update(time) {
    if (this.lastTime == 0) {
      this.lastTime = time
    }

    const deltaTime = time - this.lastTime
    this.lastTime = time
    this.elapsedTime += deltaTime

    if (this.elapsedTime >= cfg.ANIM_DURATION) {
      map.draw()
      this.elapsedTime = 0
      this.lastTime = 0
    }
  }
}