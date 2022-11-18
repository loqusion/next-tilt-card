import React from 'react'
import styles from './TiltCard.module.css'
import useTiltStyle from './hooks/use-tilt-style'
import { ReactComponent as GeistIcon } from './geist-icon.svg'

type AdditionalProps = {
  testValues?: {
    rotateX?: number
    rotateY?: number
    rotateAngle?: number
  }
  showBlob?: boolean
}

export type TiltCardProps = AdditionalProps & {
  href?: string
  icon: React.ReactNode
  title: string
  subTitle?: string
  paragraph: React.ReactNode
  buttonText: string
}

export default function TiltCard({
  href,
  icon,
  title,
  subTitle,
  paragraph,
  buttonText,
  testValues,
  showBlob = true,
}: TiltCardProps) {
  const rootRef = React.useRef<HTMLAnchorElement>(null)
  const rootStyle = useTiltStyle(rootRef)

  if (testValues) {
    const { rotateX, rotateY, rotateAngle } = testValues
    // rootStyle['--glow-clip-path'] = `circle(50px at ${bgPosition.x}px ${bgPosition.y}px)`
    // rootStyle[
    //   '--glow-bg'
    // ] = `radial-gradient( circle at ${bgPosition.x}px ${bgPosition.y}px, #0141FF55, #0000000f )`
    rootStyle.transform = `scale3d(1.01, 1.01, 1.01) rotate3d(${rotateX}, ${rotateY}, 0, ${rotateAngle}deg)`
  }

  return (
    <a ref={rootRef} className={styles.root} style={rootStyle} href={href}>
      {showBlob && !testValues && (
        <div className={styles.blob} aria-hidden={true} />
      )}

      <div className={styles.featuredWrapper}>
        {icon}
        <div className={styles.announcementSubtext}>
          <h2 className={styles.announcementTitle}>{title}</h2>
          <span className={styles.announcementSubtitle}>{subTitle}</span>
          <p>{paragraph}</p>
        </div>
        <button className={styles.button}>
          {buttonText} <GeistIcon />
        </button>
      </div>

      <div className={styles.glow} aria-hidden={true} />
    </a>
  )
}
