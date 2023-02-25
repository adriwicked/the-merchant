function clearCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawBackground(ctx, color) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawVector(ctx, origin, terminal) {
  ctx.beginPath()
  ctx.moveTo(origin.x, origin.y)
  ctx.lineTo(terminal.x, terminal.y)
  ctx.lineWidth = 2
  ctx.strokeStyle = 'red'
  ctx.stroke()
}

export default {
  clearCanvas,
  drawBackground,
  drawVector
}