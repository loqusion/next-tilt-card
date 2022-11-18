import React from 'react'
import { ReactComponent as NextLogo } from './next-logo.svg'
import { ReactComponent as GeistIcon } from './geist-icon.svg'
import styles from './App.module.css'
import TiltCard from './TiltCard'

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180
}

function PopulatedTiltCard(props: any) {
  return (
    <TiltCard {...props}>
      <div className={styles.featuredWrapper}>
        <NextLogo />
        <div className={styles.announcementSubtext}>
          <h2 className={styles.announcementTitle}>Next.js 13</h2>
          <span className={styles.announcementSubtitle}>By Vercel</span>
          <p>
            Bringing the power of full-stack
            <span style={{ display: 'block' }} />
            to the frontend.
          </p>
        </div>
        <button className={styles.button}>
          Get Started <GeistIcon />
        </button>
      </div>
    </TiltCard>
  )
}

function Slider(props: React.ComponentProps<'input'>) {
  return <input type="range" {...props} />
}

function SliderContainer({
  title,
  children,
}: React.PropsWithChildren<{ title?: string }>) {
  return (
    <div className={styles.sliderContainer}>
      <label>{title}</label>
      <div className={styles.sliderChildrenWrapper}>{children}</div>
    </div>
  )
}

export default function App() {
  const [angle, setAngle] = React.useState(0)
  const [directionAngle, setDirectionAngle] = React.useState(0)

  // (hypotenuse = 1)
  // SOH: sin(a) = y/1 = y
  // CAH: cos(a) = x/1 = x
  const x = Math.cos(degToRad(directionAngle))
  const y = Math.sin(degToRad(directionAngle))

  return (
    <div className={styles.appWrapper}>
      <div className={styles.yetAnotherWrapper}>
        <PopulatedTiltCard rotateX={x} rotateY={y} rotateAngle={angle} />
        <div className={styles.controls}>
          <SliderContainer title="Angle:">
            <span>{angle}°</span>
            <Slider
              min="0"
              max="180"
              value={angle}
              onChange={(ev) => setAngle(Number.parseInt(ev.target.value, 10))}
            />
          </SliderContainer>
          <SliderContainer title="Direction of axis of rotation:">
            <span>{directionAngle}°</span>
            <Slider
              min="0"
              max="360"
              value={directionAngle}
              onChange={(ev) =>
                setDirectionAngle(Number.parseInt(ev.target.value, 10))
              }
            />
          </SliderContainer>
        </div>
      </div>
    </div>
  )
}
