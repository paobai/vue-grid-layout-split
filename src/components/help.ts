export enum GridItemType {
  SMALL = 0,
  BIG = 1
}
export enum GridPosition {
  LEFT = 0,
  RIGHT = 1
}

export interface LayoutType {
  id: number
  x: number
  y: number
  h: number
  height: number
  resetH: number
  type: GridItemType
  [key: string]: any
}

// 修复vue-grid-layout y高度小于0情况
export function fixCardHeight(layout: LayoutType[]) {
  // 修复bug Y有可能从负数开始
  checkLessThanZeroY(layout)
  // 使在两个大卡片之间的卡片高度一样
  fixCardSameHeight(layout)
}

function fixCardSameHeight(layout: LayoutType[]) {
  const findLeftBigList = getLeftBigList(layout)
  findLeftBigList.forEach((e, index) => {
    const lessThanY = e.y + e.h
    let moreThanY = 0
    if (index > 0) moreThanY = findLeftBigList[index - 1].y + findLeftBigList[index - 1].h
    const { sumH: x0SumH, lastDist: x0LastDist } = findMaxY(layout, 0, lessThanY, moreThanY)
    const { sumH: x1SumH, lastDist: x1LastDist } = findMaxY(layout, 1, lessThanY, moreThanY)
    if (x0LastDist && x1LastDist) {
      const maxYAddH = Math.max(x0SumH, x1SumH)
      x0LastDist.h = x0LastDist.h + maxYAddH - x0SumH
      x1LastDist.h = x1LastDist.h + maxYAddH - x1SumH
    }
  })
}
function findMaxY(layout: LayoutType[], x: number, lessThanY: number, moreThanY: number) {
  const findInRangeList = layout
    .filter(e => e.x === x && e.y + e.h < lessThanY && e.y >= moreThanY)
    .sort((a, b) => a.y - b.y)
  findInRangeList.forEach(e => {
    e.h = e.resetH
  })
  let sumH = 0
  findInRangeList.forEach(e => {
    sumH += e.h
  })
  return { sumH, lastDist: findInRangeList[findInRangeList.length - 1], findInRangeList }
}

function getLeftBigList(layout: LayoutType[]): LayoutType[] {
  return layout
    .filter(e => {
      return e.type === GridItemType.BIG && e.x === 0
    })
    .sort((a, b) => a.y - b.y)
}

function checkLessThanZeroY(layout: LayoutType[]) {
  const findLeftBigList = getLeftBigList(layout)
  const fixLeft = () => {
    // 左边第一个是大的情况
    if (findLeftBigList.length > 0 && findLeftBigList[0].y <= 0) {
      const leftList = layout
        .filter(e => {
          return e.x === 0 || e.x === 1
        })
        .sort((a, b) => a.y - b.y)
      const diffY = Math.abs(findLeftBigList[0].y)
      leftList.forEach(e => {
        e.y += diffY
      })
    } else {
      let lessThanY = Number.MAX_SAFE_INTEGER
      let moreThanY = Number.MAX_SAFE_INTEGER
      if (findLeftBigList.length > 0) {
        lessThanY = findLeftBigList[0].y + findLeftBigList[0].h
        moreThanY = findLeftBigList[0].y
      }

      const { sumH: x0SumH, findInRangeList: x0FindInRangeList } = findMaxY(
        layout,
        0,
        lessThanY,
        Number.MIN_SAFE_INTEGER
      )
      const { sumH: x1SumH, findInRangeList: x1FindInRangeList } = findMaxY(
        layout,
        1,
        lessThanY,
        Number.MIN_SAFE_INTEGER
      )
      let startX0Y = 0
      let startX1Y = 0
      if (x0FindInRangeList.length !== 0) startX0Y = x0FindInRangeList[0].y
      if (x1FindInRangeList.length !== 0) startX1Y = x1FindInRangeList[0].y
      const maxYAddHBefore = Math.max(x0SumH, x1SumH)
      const maxYAddHAfter = Math.max(x0SumH + Math.abs(startX0Y), x1SumH + Math.abs(startX1Y))
      const diffY = maxYAddHAfter - maxYAddHBefore
      x0FindInRangeList.forEach((e: any) => {
        e.y += Math.abs(startX0Y)
      })
      x1FindInRangeList.forEach((e: any) => {
        e.y += Math.abs(startX1Y)
      })
      layout
        .filter(e => {
          return e.y >= moreThanY && (e.x === 0 || e.x === 1)
        })
        .forEach(e => {
          e.y += diffY
        })
    }
  }
  const fixRight = () => {
    const rightList = layout
      .filter(e => {
        return e.x === 2
      })
      .sort((a, b) => a.y - b.y)
    if (rightList.length === 0) return
    const diffY = Math.abs(rightList[0].y)
    rightList.forEach(e => {
      e.y += diffY
    })
  }
  fixLeft()
  fixRight()
}
