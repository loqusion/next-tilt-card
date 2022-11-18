import styles from './TiltCard.module.css'
import useHover from './use-hover'
import useContainedMousePosition from './use-contained-mouse-position'

type AdditionalProps = {
  rotateX?: number
  rotateY?: number
  rotateAngle?: number
  testView?: boolean
}

export default function TiltCard({
  href,
  rotateX,
  rotateY,
  rotateAngle,
  testView,
  children,
}: React.PropsWithChildren<{ href?: string } & AdditionalProps>) {
  const [position, mousePositionProps] = useContainedMousePosition()
  const [isHover, hoverProps] = useHover()

  const bgPosition = {
    ...position,
    /* x: 629.4000091552734, */
    /* y: 590.8333740234375, */
  }
  const rotate = {
    x: testView ? rotateX : position.x,
    y: testView ? rotateY : position.y,
    a: testView ? rotateAngle : 5,
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
      className={styles.root}
      style={rootStyle}
      href={href}
      {...mousePositionProps}
      {...hoverProps}
    >
      {!testView && <div className={styles.blob} aria-hidden={true} />}
      {children}
      <div className={styles.glow} aria-hidden={true} />
    </a>
  )
}
