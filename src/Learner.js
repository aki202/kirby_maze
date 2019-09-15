import config from 'config'
import Solver from 'Solver'
import { convertThetaIntoPi } from 'utilities/convert'
import nj from 'numjs'

class Learner {
  constructor(theta, epoch, startIndex, endIndex) {
    this.theta         = theta
    this.epoch = epoch
    this.startIndex = startIndex
    this.endIndex   = endIndex
  }

  learn() {
    for (let i = 0; i < this.epoch; i++) {
      const pi = convertThetaIntoPi(this.theta)
      const histories = new Solver(pi, this.startIndex, this.endIndex).solve()
      console.log(`Total step count=${histories.length}`);
      this.updateTheta(histories, pi)
    }
    return this.theta
  }

  updateTheta(histories, pi) {
    const T = histories.length
    const deltaTheta = nj.zeros([config.cellsPerRow**2, 4]).tolist()

    this.theta.forEach((directions, index) => {
      const historiesOfI = histories.filter(history => history.index === index)
      const N_i = historiesOfI.length
      directions.forEach((probability, direction) => {
        if (probability === NaN) return
        const historiesOfID = historiesOfI.filter(history => history.direction === direction)
        const N_id = historiesOfID.length
        deltaTheta[index][direction] = (N_id - pi[index][direction] * N_i) / T
      })
    })

    this.theta = nj.add(this.theta, nj.multiply(deltaTheta, config.eta)).tolist()
  }
}

export default Learner
