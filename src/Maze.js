import config from 'config'
import Block from 'Block'
import Goal from 'Goal'

class Maze {
  constructor(canvas, goalIndex) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.blocks = []

    this.routes = config.routes

    this.routes.forEach((route, index) => {
      if (route === 1) return
      this.blocks.push( new Block(canvas, index) )
    })

    this.goal = new Goal(canvas, goalIndex)
  }

  draw() {
    this.blocks.forEach(block => block.draw())
    this.goal.draw()
  }
}

export default Maze
