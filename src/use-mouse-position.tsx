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

  const onMouseMove: React.MouseEventHandler = React.useCallback(
    ({ nativeEvent: ev }) => {
      setPosition({ x: ev.offsetX, y: ev.offsetY })
    },
    []
  )

  return [position, { onMouseMove }]
}
