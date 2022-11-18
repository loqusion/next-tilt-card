import * as React from 'react'

type Position = {
  x: number | null
  y: number | null
}

type MousePositionProps = {
  onMouseMove: React.MouseEventHandler
}

export default function useContainedMousePosition(): [
  Position,
  MousePositionProps
] {
  const [position, setPosition] = React.useState<Position>({
    x: null,
    y: null,
  })
  React.useDebugValue(position)

  const onMouseMove: React.MouseEventHandler = React.useCallback((ev) => {
    const nev = ev.nativeEvent
    // slow!! see https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    const bound = ev.currentTarget.getBoundingClientRect()
    const position = {
      x: nev.clientX - bound.left,
      y: nev.clientY - bound.top,
    }
    setPosition(position)
  }, [])

  return [position, { onMouseMove }]
}
