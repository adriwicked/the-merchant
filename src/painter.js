import { ctx } from './game.js'

function clearCanvas() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawBackground(color) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawRect({ x, y, width, height, color }) {
  ctx.save()

  ctx.fillStyle = color
  ctx.beginPath()
  ctx.fillRect(x, y, width, height)

  ctx.restore()
}

function drawVector(origin, terminal) {
  ctx.save()

  ctx.strokeStyle = 'red'
  ctx.lineWidth = 1

  ctx.beginPath()
  ctx.moveTo(origin.x, origin.y)
  ctx.lineTo(terminal.x, terminal.y)
  ctx.stroke()

  ctx.restore()
}

function randomizeColor(hexColor) {
  let {r, g, b} = hexToRgb(hexColor)

  let randSaturation = Math.random() * 0.1 + 0.95
  let randBrightness = Math.random() * 0.1 + 0.95

  r = Math.round(Math.min(r * randSaturation * randBrightness, 255))
  g = Math.round(Math.min(g * randSaturation * randBrightness, 255))
  b = Math.round(Math.min(b * randSaturation * randBrightness, 255))

  return rgbToHex(r, g, b)
}

function hexToRgb(hexColor) {
  let hex = hexColor.slice(1)
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)
  return {r, g, b}
}

function rgbToHex(r, g, b) {
  r = Math.round(r)
  g = Math.round(g)
  b = Math.round(b)
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function componentToHex(c) {
  let hex = c.toString(16)
  return hex.length === 1 ? "0" + hex : hex
}


export default {
  clearCanvas,
  drawBackground,
  drawRect,
  drawVector,
  randomizeColor
}