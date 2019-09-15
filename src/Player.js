import { getIndex, positionByIndex } from 'utilities/calculators'
import config from 'config'

const imageSize = 7

class Player {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.imgs = []
    this.loadedCount = 0
    this.loaded = false
    this.imgFrame = 0
    this.nextIndex = 0
    this.step = 0
    this.x = 0
    this.y = 0
    this.moveX = 0 // 0:移動なし, -1:負, 1:正
    this.moveY = 0 // 0:移動なし, -1:負, 1:正
    this.state = 'stop'
    this.innerFrame = 0

    this.onLoad = this.onLoad.bind(this)
    this.draw = this.draw.bind(this)

    for (let i = 0; i < imageSize; i++) {
      const img = new Image()
      img.src = `img/player/${i}.gif`
      img.onload = this.onLoad
      this.imgs.push(img)
    }
  }

  onLoad() {
    this.loadedCount++
    if (this.loadedCount === imageSize) this.loaded = true
  }

  setHistories(histories) {
    this.histories = histories
    this.state = 'run'
    this.reachedNextCell()
  }

  reachedNextCell() {
    const nextIndex = getIndex(this.step+1, this.histories)
    if (nextIndex === false) {
      this.state = 'goal'
      return
    }
    this.step++
    this.nextIndex = nextIndex
    const [nextX, nextY] = positionByIndex(this.nextIndex)

    if (this.x > nextX) this.moveX = -1
    else if (this.x < nextX) this.moveX = 1
    else this.moveX = 0

    if (this.y > nextY) this.moveY = -1
    else if (this.y < nextY) this.moveY = 1
    else this.moveY = 0
  }

  updatePosition() {
    const [nextX, nextY] = positionByIndex(this.nextIndex)

    if (this.moveX === 1) this.x += 5
    if (this.moveX === -1) this.x -= 5
    if (this.moveY === 1) this.y += 5
    if (this.moveY === -1) this.y -= 5

    if (this.moveX === 1 && this.x > nextX) {
      this.x = nextX
      this.reachedNextCell()
      return
    }
    if (this.moveX === -1 && this.x < nextX) {
      this.x = nextX
      this.reachedNextCell()
      return
    }
    if (this.moveY === 1 && this.y > nextY) {
      this.y = nextY
      this.reachedNextCell()
      return
    }
    if (this.moveY === -1 && this.y < nextY) {
      this.y = nextY
      this.reachedNextCell()
      return
    }
  }

  drawText() {
    this.ctx.fillStyle = 'black'
    this.ctx.textAlign = 'right'
    this.ctx.font = "26px 'Hiragino Mincho Pro','MS Mincho','TakaoMincho'"
    this.ctx.fillText(`学習回数=${config.epoch}`,
                      this.canvas.width-10, 30)
    this.ctx.font = "20px 'Hiragino Mincho Pro','MS Mincho','TakaoMincho'"
    this.ctx.fillText(`step=${this.step}, cell=${this.nextIndex}, ` +
                      `pos=(${this.x}, ${this.y})`,
                      this.canvas.width-10, this.canvas.height-15)
  }

  draw() {
    if (!this.loaded) return
    //if (this.state === 'stop') return

    this.ctx.save();
    let x = this.x
    if (this.moveX === -1) {
      this.ctx.scale(-1,1);
      this.ctx.translate(-this.canvas.width, 0);
      x = this.canvas.width - x - 31
    }
    this.ctx.drawImage(this.imgs[this.imgFrame], x, this.y+3, 31, 24)
    this.ctx.restore();
    this.innerFrame++
    if (this.innerFrame % 5 === 0) {
      this.innerFrame = 0
      this.imgFrame++
    }
    if (this.imgFrame > imageSize - 1) this.imgFrame = 0
    this.updatePosition()
    this.drawText()
  }
}

export default Player
