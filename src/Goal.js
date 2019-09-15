import { positionByIndex } from 'utilities/calculators'

class Goal {
  constructor(canvas, index) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.index = index
    this.loaded = false

    this.img = new Image()
    this.img.src = 'img/tomato.gif'
    this.img.onload = () => {
      this.loaded = true
    }
  }

  draw() {
    if (!this.loaded) return

    const [x, y] = positionByIndex(this.index)
    this.ctx.drawImage(this.img, x+8, y+8, 16, 16)
  }
}

export default Goal
