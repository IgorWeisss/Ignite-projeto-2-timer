import { Play } from 'phosphor-react'
import {
  ButtonContainer,
  CounterContainer,
  HomeContainer,
  HomeContent,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <HomeContent>
        <label htmlFor="projectName">Vou trabalhar em</label>
        <input
          type="text"
          id="projectName"
          placeholder="Dê um nome para o seu projeto"
        />
        <label htmlFor="minutesAmount">durante</label>
        <input type="number" id="minutesAmount" placeholder="00" />
        <span>minutos.</span>
      </HomeContent>
      <CounterContainer>
        <div className="numbers">
          <span>0</span>
          <span>0</span>
        </div>
        <span className="separator">:</span>
        <div className="numbers">
          <span>0</span>
          <span>0</span>
        </div>
      </CounterContainer>
      <ButtonContainer>
        <Play size={26} />
        Começar
      </ButtonContainer>
    </HomeContainer>
  )
}
