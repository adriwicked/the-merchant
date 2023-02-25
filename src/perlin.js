export default function buildPerlin({gridWidth, gridHeight, resolution}) {
  let vectors
  let values

  init()

  function init() {
    const numVectorsX = Math.floor(gridWidth / resolution) + 1
    const extraVectorX = gridWidth % resolution == 0 ? 0 : 1
    const vectorsX = numVectorsX + extraVectorX

    const numVectorsY = Math.floor(gridHeight / resolution) + 1
    const extraVectorY = gridHeight % resolution == 0 ? 0 : 1
    const vectorsY = numVectorsY + extraVectorY

    vectors = new Array(vectorsY).fill(0)
      .map(() => new Array(vectorsX).fill(0).map(getRandUnitVect))

    values = new Array(gridHeight).fill(0)
      .map(() => new Array(gridWidth).fill(0))

    for (let row = 0; row < values.length; row++) {
      for (let col = 0; col < values[0].length; col++) {
        values[row][col] = getValue(row, col)
      }
    }
  }

  function getRandUnitVect() {
    const theta = Math.random() * 2 * Math.PI;
    return { x: Math.cos(theta), y: Math.sin(theta) };
  }

  function getValue(x, y) {
    x += 0.5
    y += 0.5
    let xTopLeftIdx = Math.floor(x / resolution)
    let yTopLeftIdx = Math.floor(y / resolution)

    let topLeft = dot_prod_grid(x, y, xTopLeftIdx, yTopLeftIdx)
    let topRight = dot_prod_grid(x, y, xTopLeftIdx + 1, yTopLeftIdx)
    let bottomLeft = dot_prod_grid(x, y, xTopLeftIdx, yTopLeftIdx + 1)
    let bottomRight = dot_prod_grid(x, y, xTopLeftIdx + 1, yTopLeftIdx + 1)
    let lerpTop = lerp(x - xTopLeftIdx, topLeft, topRight)
    let lerpBottom = lerp(x - xTopLeftIdx, bottomLeft, bottomRight)
    let value = lerp(y - yTopLeftIdx, lerpTop, lerpBottom)

    console.log(`x:${x}|xIdx:${xTopLeftIdx}|bottomRight:${bottomRight}`)

    return topLeft
  }

  function dot_prod_grid(x, y, xIdx, yIdx) {
    let g_vect = vectors[xIdx][yIdx]
    let d_vect = {
      x: x - xIdx * resolution + resolution,
      y: y - yIdx * resolution + resolution
    }

    return d_vect.x * g_vect.x + d_vect.y * g_vect.y
  }

  function lerp(x, a, b) {
    return a + x * (b - a)
    // return a + smootherstep(x) * (b - a)
  }

  function smootherstep(x) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3
  }

  return {
    init,
    getVectors: () => vectors,
    getValues: () => values
  }
}
