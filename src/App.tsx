import React from 'react'
import { ReactComponent as NextLogo } from './next-logo.svg'
import { ReactComponent as TurbopackLogo } from './turbopack.svg'
import { ReactComponent as VercelLogo } from './vercel-logo.svg'
import styles from './App.module.css'
import TiltCard, { TiltCardProps } from './TiltCard'

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180
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

const nextCardProps: TiltCardProps = {
  icon: <NextLogo />,
  title: 'Next.js 13',
  subTitle: 'By Vercel',
  paragraph: (
    <>
      Bringing the power of full-stack
      <span style={{ display: 'block' }} />
      to the frontend.
    </>
  ),
  buttonText: 'Get Started',
  href: 'https://nextjs.org/',
  accentColor: '#0141ff',
}

const turboCardProps: TiltCardProps = {
  icon: <TurbopackLogo />,
  title: 'Turbopack',
  paragraph: (
    <>
      Introducing the successor to
      <span style={{ display: 'block' }} />
      Webpack, written in Rust.
    </>
  ),
  buttonText: 'Try in Next.js 13',
  href: 'https://vercel.com/blog/turbopack',
  accentColor: '#ba1ee4',
}

const vercelCardProps: TiltCardProps = {
  icon: <VercelLogo />,
  title: 'Vercel',
  paragraph: <>The native Next.js platform.</>,
  buttonText: 'Deploy Now',
  href: 'https://vercel.com/',
  accentColor: '#ffffff',
}

export default function App() {
  const [angle, setAngle] = React.useState(0)
  const [directionAngle, setDirectionAngle] = React.useState(0)
  const [showTestView, setShouldEnableTestView] = React.useState(false)
  const [showBlob, setShowBlob] = React.useState(true)

  // (hypotenuse = 1)
  // SOH: sin(a) = y/1 = y
  // CAH: cos(a) = x/1 = x
  const x = Math.cos(degToRad(directionAngle))
  const y = Math.sin(degToRad(directionAngle))

  const tiltCards = [nextCardProps, turboCardProps, vercelCardProps].map(
    (props) => (
      <TiltCard
        key={props.title}
        {...props}
        showBlob={showBlob}
        testValues={
          showTestView
            ? {
                rotateX: x,
                rotateY: y,
                rotateAngle: angle,
              }
            : undefined
        }
      />
    )
  )

  return (
    <div className={styles.appWrapper}>
      <div className={styles.yetAnotherWrapper}>
        <div className={styles.tiltCardsWrapper}>{tiltCards}</div>

        <label>
          Test view
          <input
            type="checkbox"
            checked={showTestView}
            onChange={() => setShouldEnableTestView((x) => !x)}
            style={{ marginLeft: '6px' }}
          />
        </label>
        <label
          className={styles.showBlob}
          style={{ visibility: showTestView ? 'hidden' : 'visible' }}
        >
          Show blob
          <input
            type="checkbox"
            checked={showBlob}
            onChange={() => setShowBlob((x) => !x)}
            style={{ marginLeft: '6px' }}
          />
        </label>
        <div
          className={styles.controls}
          style={{ visibility: showTestView ? 'visible' : 'hidden' }}
        >
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
