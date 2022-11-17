import React from 'react'
import { ReactComponent as NextLogo } from './next-logo.svg'
import { ReactComponent as GeistIcon } from './geist-icon.svg'
import './App.css'
import TiltCard from './TiltCard'

function PopulatedTiltCard(props: any) {
  return (
    <TiltCard {...props}>
      <div className="featured-wrapper">
        <NextLogo />
        <div className="announcement-subtext">
          <h2 className="announcement-title">Next.js 13</h2>
          <span className="announcement-subtitle">By Vercel</span>
          <p>
            Bringing the power of full-stack
            <span style={{ display: 'block' }} />
            to the frontend.
          </p>
        </div>
        <button className="button">
          Get Started <GeistIcon />
        </button>
      </div>
    </TiltCard>
  )
}

function Slider(props: React.ComponentProps<'input'>) {
  return <input type="range" {...props} />
}

export default function App() {
  const [x, setX] = React.useState(0)
  const [y, setY] = React.useState(0)
  const [angle, setAngle] = React.useState(0)

  return (
    <div className="app-wrapper">
      <PopulatedTiltCard rotateX={x} rotateY={y} rotateAngle={angle} />
      <Slider
        min="0"
        max="1000"
        value={x}
        onChange={(ev) => setX(Number.parseInt(ev.target.value, 10))}
      />
      <Slider
        min="0"
        max="1000"
        value={y}
        onChange={(ev) => setY(Number.parseInt(ev.target.value, 10))}
      />
      <Slider
        min="0"
        max="180"
        value={angle}
        onChange={(ev) => setAngle(Number.parseInt(ev.target.value, 10))}
      />
    </div>
  )
}
