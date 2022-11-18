import styles from './TiltCard.module.css'
import useHover from './use-hover'
import useContainedMousePosition from './use-contained-mouse-position'

type AdditionalProps = {
  rotateX?: number
  rotateY?: number
  rotateAngle?: number
}

export default function TiltCard({
  href,
  rotateX,
  rotateY,
  rotateAngle,
  children,
}: React.PropsWithChildren<{ href?: string } & AdditionalProps>) {
  const [position, mousePositionParams] = useContainedMousePosition()
  const [isHover, hoverParams] = useHover()
  const isTest = [rotateX, rotateY, rotateAngle].some((x) => x != null)

  const bgPosition = {
    ...position,
    /* x: 629.4000091552734, */
    /* y: 590.8333740234375, */
  }
  const rotate = {
    x: rotateX,
    y: rotateY,
    a: rotateAngle,
  }

  const rootStyle = {
    '--glow-bg': `radial-gradient( circle at ${bgPosition.x}px ${bgPosition.y}px, #0141FF55, #0000000f )`,
    '--glow-opacity': isHover ? 0.3 : 0,
    transform:
      isHover || isTest
        ? `scale3d(1.01, 1.01, 1.01) rotate3d(${rotate.x}, ${rotate.y}, 0, ${rotate.a}deg)`
        : undefined,
  } as React.CSSProperties

  return (
    <a
      className={styles.root}
      style={rootStyle}
      href={href}
      {...mousePositionParams}
      {...hoverParams}
    >
      <div className={styles.blob} aria-hidden={true} />
      {children}
      <div className={styles.glow} aria-hidden={true} />
    </a>
  )
}
