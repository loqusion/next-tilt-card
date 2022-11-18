import React from 'react'
import styles from './TiltCard.module.css'
import useHover from './use-hover'
import useContainedMousePosition from './use-contained-mouse-position'
import useBoundingClientRect from './use-bounding-client-rect'

function scaleCoord(c1: number, c2: number, scale: number) {
  return (c1 - c2) * scale + c2
}

type AdditionalProps = {
  rotateX?: number
  rotateY?: number
  rotateAngle?: number
  testView?: boolean
  showBlob?: boolean
}

export default function TiltCard({
  href,
  rotateX,
  rotateY,
  rotateAngle,
  testView = false,
  showBlob = true,
  children,
}: React.PropsWithChildren<{ href?: string } & AdditionalProps>) {
  const [position, mousePositionProps] = useContainedMousePosition()
  const [isHover, hoverProps] = useHover()
  const rootRef = React.useRef<HTMLAnchorElement>(null)
  const boundingClientRect = useBoundingClientRect(rootRef)

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
    x: testView ? rotateX : relativeMousePosition.y,
    y: testView ? rotateY : -relativeMousePosition.x,
    a: testView
      ? rotateAngle
      : (Math.hypot(relativeMousePosition.x * ratio, relativeMousePosition.y) *
          6) /
        centerPosition.y,
  }

  const rootStyle = {
    '--glow-bg': `radial-gradient( circle at ${bgPosition.x}px ${bgPosition.y}px, #0141FF55, #0000000f )`,
    '--glow-clip-path': testView
      ? `circle(50px at ${bgPosition.x}px ${bgPosition.y}px)`
      : undefined,
    '--glow-opacity': isHover ? 0.3 : 0,
    transform:
      isHover || testView
        ? `scale3d(1.01, 1.01, 1.01) rotate3d(${rotate.x}, ${rotate.y}, 0, ${rotate.a}deg)`
        : undefined,
  } as React.CSSProperties

  return (
    <a
      ref={rootRef}
      className={styles.root}
      style={rootStyle}
      href={href}
      {...mousePositionProps}
      {...hoverProps}
    >
      {showBlob && !testView && (
        <div className={styles.blob} aria-hidden={true} />
      )}
      {children}
      <div className={styles.glow} aria-hidden={true} />
    </a>
  )
}
