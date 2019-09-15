import config from 'config'
import nj from 'numjs'

export const convertRouteIntoTheta = (routes) => {
  return routes.map((_route, index) => {
    const goTop = (routes[index-config.cellsPerRow] === 1) ? 1 : NaN

    let goRight = NaN
    if ((index + 1) % config.cellsPerRow > 0) goRight = (routes[index+1] === 1) ? 1 : NaN

    let goBottom = (routes[index+config.cellsPerRow] === 1) ? 1 : NaN

    let goLeft = NaN
    if (index % config.cellsPerRow > 0) goLeft = (routes[index-1] === 1) ? 1 : NaN

    return [goTop, goRight, goBottom, goLeft]
  })
}

export const convertThetaIntoPi = (theta) => {
  return theta.map(directions => {
    const exp = nj.exp(directions).tolist()
    const sum = nj.sum(exp.filter(n => n > 0))
    return nj.divide(exp , sum).tolist()
  })
}
