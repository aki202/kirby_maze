import config from 'config'
import Background from 'Background'
import Maze from 'Maze'
import Player from 'Player'
import Solver from 'Solver'
import Learner from 'Learner'
import Global from 'Global'
import { convertRouteIntoTheta, convertThetaIntoPi } from 'utilities/convert'
import { resolve } from 'uri-js'

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

const global = new Global()
const background = new Background(canvas)
const maze = new Maze(canvas, 156)
const player = new Player(canvas)

console.log(1);

canvas.width  = config.cellsPerRow * config.cellW
canvas.height = config.cellsPerRow * config.cellH

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  background.draw()
  maze.draw()
  player.draw()
}

setInterval(draw, 30)

const learn = async () => {
  const theta0 = convertRouteIntoTheta(config.routes)
  let learner = new Learner(theta0, config.epoch, 0, 156)
  const theta = learner.learn()
  const pi = convertThetaIntoPi(theta)
  const histories = new Solver(pi, 0, 156).solve()
  player.setHistories(histories)
  learner = null
}
//window.learn = learn
learn()
console.log(2)
