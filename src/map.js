export default function buildMap(width, height) {
    let map = new Array(height).fill(0)
        .map(() => new Array(width).fill(0))
    return {
        getGrid: () => map
    }
}
