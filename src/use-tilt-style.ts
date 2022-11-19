import React from 'react'
import useMouse from '@react-hook/mouse-position'

function scaleCoord(c1: number, c2: number, scale: number) {
  return (c1 - c2) * scale + c2
}

export default function useTiltStyle(
  ref: React.RefObject<HTMLElement>,
  accentColor: string
) {
  const position = useMouse(ref)
  const { isOver, elementWidth, elementHeight } = position

  const centerPosition = {
    x: elementWidth! / 2,
    y: elementHeight! / 2,
  }
  const relativeMousePosition = {
    x: position.x! - centerPosition.x,
    y: position.y! - centerPosition.y,
  }
  const maxLength = Math.max(elementWidth!, elementHeight!)
  const minLength = Math.min(elementWidth!, elementHeight!)
  const ratio = maxLength / minLength

  const scale = 2
  const bgPosition = {
    x: scaleCoord(position.x!, centerPosition.x, scale),
    y: scaleCoord(position.y!, centerPosition.y, scale),
  }
  const rotate = {
    x: relativeMousePosition.y,
    y: -relativeMousePosition.x,
    a:
      (Math.hypot(relativeMousePosition.x * ratio, relativeMousePosition.y) *
        6) /
      centerPosition.y,
  }

  const style = {
    '--glow-bg': `radial-gradient( circle at ${bgPosition.x}px ${bgPosition.y}px, ${accentColor}55, #0000000f )`,
    '--glow-opacity': isOver ? 0.3 : 0,
    transform: isOver
      ? `scale3d(1.01, 1.01, 1.01) rotate3d(${rotate.x}, ${rotate.y}, 0, ${rotate.a}deg)`
      : undefined,
  } as React.CSSProperties

  return style
}
