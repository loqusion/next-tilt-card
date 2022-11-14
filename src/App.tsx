import { ReactComponent as NextLogo } from './next-logo.svg'
import { ReactComponent as GeistIcon } from './geist-icon.svg'
import './App.css'
import TiltCard from './TiltCard'

function PopulatedTiltCard() {
  return (
    <TiltCard>
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

export default function App() {
  return (
    <div className="app-wrapper">
      <PopulatedTiltCard />
    </div>
  )
}
