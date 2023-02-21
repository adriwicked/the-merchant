let cnv
let ctx
let board

window.onload = init

function init() {
    cnv = document.getElementById("cnv");
    cnv.width = 800
    cnv.height = 600
    ctx = cnv.getContext('2d')
    ctx.fillStyle = '#444444'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}
