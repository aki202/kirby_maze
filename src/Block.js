import { getIndex, positionByIndex } from 'utilities/calculators'

class Block {
  constructor(canvas, index) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.index = index
    this.loaded = false

    this.img = new Image()
    this.img.src = 'img/mountain.png'
    this.img.onload = () => {
      this.loaded = true
    }
  }

  draw() {
    if (!this.loaded) return

    const [x, y] = positionByIndex(this.index)
    this.ctx.drawImage(this.img, x, y+5, 31, 24)
  }
}

export default Block
