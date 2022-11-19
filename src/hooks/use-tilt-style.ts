import useBoundingClientRect from './use-bounding-client-rect'
import useContainedMousePosition from './use-contained-mouse-position'
import useHover from './use-hover'

function scaleCoord(c1: number, c2: number, scale: number) {
  return (c1 - c2) * scale + c2
}

export default function useTiltStyle(
  ref: React.RefObject<HTMLElement>,
  accentColor = '#ffffff'
) {
  const isHover = useHover(ref)
  const position = useContainedMousePosition(ref)
  const boundingClientRect = useBoundingClientRect(ref)

  const centerPosition = {
    x: boundingClientRect?.width! / 2,
    y: boundingClientRect?.height! / 2,
  }
  const relativeMousePosition = {
    x: position.x! - centerPosition.x,
    y: position.y! - centerPosition.y,
  }
  const maxLength = Math.max(
    boundingClientRect?.width!,
    boundingClientRect?.height!
  )
  const minLength = Math.min(
    boundingClientRect?.width!,
    boundingClientRect?.height!
  )
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
    // '--glow-clip-path': testView
    //   ? `circle(50px at ${bgPosition.x}px ${bgPosition.y}px)`
    //   : undefined,
    '--glow-opacity': isHover ? 0.3 : 0,
    transform: isHover
      ? //|| testView
        `scale3d(1.01, 1.01, 1.01) rotate3d(${rotate.x}, ${rotate.y}, 0, ${rotate.a}deg)`
      : undefined,
  } as React.CSSProperties

  return style
}
