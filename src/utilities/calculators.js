import config from 'config'

export const getIndex = (step, histories) => {
  if (histories[step] === undefined) return false
  return histories[step]['index']
}

export const positionByIndex = (index) => {
  const col = index % config.cellsPerRow
  const row = Math.floor(index / config.cellsPerRow)
  const x = col * config.cellH
  const y = row * config.cellW
  return [x, y]
}
