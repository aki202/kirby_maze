import config from 'config'
import Solver from 'Solver'
import Learner from 'Learner'
import { convertRouteIntoTheta, convertThetaIntoPi } from 'utilities/convert'

const theta0 = convertRouteIntoTheta(config.routes)
//const pi0 = convertThetaIntoPi(theta0)

const learner = new Learner(theta0, 3000, 0, 155)
learner.learn()

//const solver = new Solver(pi0, 0, 28)
//const histories = solver.solve()
//console.log('histories', histories)
//console.log('histories', histories.slice(histories.length-20))
