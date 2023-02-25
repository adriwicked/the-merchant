import { ctx } from './game.js'

function clearCanvas() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawBackground(color) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawVector(origin, terminal) {
  ctx.save();

  ctx.strokeStyle = 'red';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(terminal.x, terminal.y);
  ctx.stroke();

  ctx.restore();
}


export default {
  clearCanvas,
  drawBackground,
  drawVector
}