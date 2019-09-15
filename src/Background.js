import config from 'config'

const imageSize = 7

class Background {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.loaded = false

    this.draw = this.draw.bind(this)

    this.img = new Image()
    this.img.src = 'img/green.png'
    this.img.onload = () => {
      this.loaded = true
      this.pattern = this.ctx.createPattern(this.img, 'repeat')
    }
  }

  draw() {
    if (!this.loaded) return

    const w = config.cellW
    const h = config.cellH
    //this.ctx.rect(w, h, this.canvas.width-w*2, this.canvas.height-h*2)
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = this.pattern
    this.ctx.fill()
  }
}

export default Background
