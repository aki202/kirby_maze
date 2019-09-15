export const onTopEdge = (index, cellsPerRow) => {
  return index < cellsPerRow
}

export const onRightEdge = (index, cellsPerRow) => {
  return (index + 1) % cellsPerRow === 0
}

export const onBottomEdge = (index, cellsPerRow, total) => {
  return (index >= total - cellsPerRow)
}

export const onLeftEdge = (index, cellsPerRow) => {
  return index % cellsPerRow === 0
}

export const onEdge = (index, cellsPerRow, total) => {
  if (onTopEdge(index, cellsPerRow))           return true
  if (onRightEdge(index, cellsPerRow))         return true
  if (onBottomEdge(index, cellsPerRow, total)) return true
  if (onLeftEdge(index, cellsPerRow))          return true
  return false
}
