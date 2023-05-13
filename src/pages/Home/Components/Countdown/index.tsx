import { CounterContainer } from './styles'

export function Countdown() {
  return (
    <CounterContainer>
      <div className="numbers">
        <span>{minutesDisplayed[0]}</span>
        <span>{minutesDisplayed[1]}</span>
      </div>
      <span className="separator">:</span>
      <div className="numbers">
        <span>{secondsDisplayed[0]}</span>
        <span>{secondsDisplayed[1]}</span>
      </div>
    </CounterContainer>
  )
}
