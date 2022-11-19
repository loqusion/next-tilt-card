import React from 'react'
import styles from './TiltCard.module.css'
import useTiltStyle from './use-tilt-style'
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
  accentColor?: string
}

export default function TiltCard({
  href,
  icon,
  title,
  subTitle,
  paragraph,
  buttonText,
  accentColor = '#ffffff',
  testValues,
  showBlob = true,
}: TiltCardProps) {
  const rootRef = React.useRef<HTMLAnchorElement>(null)
  const rootStyle = useTiltStyle(rootRef, accentColor)

  if (testValues) {
    const { rotateX, rotateY, rotateAngle } = testValues
    rootStyle.transform = `scale3d(1.01, 1.01, 1.01) rotate3d(${rotateX}, ${rotateY}, 0, ${rotateAngle}deg)`
  }

  const additionalBlobStyles: React.CSSProperties = {
    background: `radial-gradient(circle, ${accentColor} 0, rgba(161, 252, 70, 0) 71%)`,
  }

  return (
    <a ref={rootRef} className={styles.root} style={rootStyle} href={href}>
      {showBlob && !testValues && (
        <div
          className={styles.blob}
          style={additionalBlobStyles}
          aria-hidden={true}
        />
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
