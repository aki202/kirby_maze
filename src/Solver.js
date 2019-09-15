import rwc from 'random-weighted-choice'
import config from 'config'

class Solver {
  constructor(pi, startIndex, endIndex) {
    this.pi         = pi
    this.startIndex = startIndex
    this.endIndex   = endIndex
  }

  solve() {
    let currentIndex = this.startIndex
    const histories = []
    while (true) {
      let   nextDirection = this.getDirection(currentIndex)
      const nextIndex     = this.getIndex(currentIndex, nextDirection)
      histories.push({ index: currentIndex, direction: nextDirection })
      currentIndex = nextIndex
      if (currentIndex === this.endIndex) {
        histories.push({ index: currentIndex, direction: null })
        break
      }
    }
    return histories
  }

  getDirection(currentIndex) {
    const table = this.pi[currentIndex].map((weight, index) => {
      return { id: index, weight: (weight || 0)*10 }
    })
    return rwc(table)-0
  }

  getIndex(currentIndex, direction) {
    if (direction === 0) return currentIndex - config.cellsPerRow
    if (direction === 1) return currentIndex + 1
    if (direction === 2) return currentIndex + config.cellsPerRow
    if (direction === 3) return currentIndex - 1
    throw new Error(`Invalid direction=${direction}`)
  }
}

export default Solver
