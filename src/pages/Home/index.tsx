import { Play } from 'phosphor-react'
import {
  ButtonContainer,
  CounterContainer,
  HomeContainer,
  FormContainer,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <FormContainer id="homeForm">
        <label htmlFor="projectName">Vou trabalhar em</label>
        <input
          type="text"
          id="projectName"
          placeholder="Dê um nome para o seu projeto"
          list="sugestionsList"
          autoComplete="off"
        />

        <datalist id="sugestionsList">
          <option value="Front-end" />
          <option value="Back-end" />
          <option value="Full-Stack" />
        </datalist>

        <label htmlFor="minutesAmount">durante</label>
        <input
          type="number"
          id="minutesAmount"
          placeholder="00"
          min={5}
          max={60}
          step={5}
        />
        <span>minutos.</span>
      </FormContainer>
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
      <ButtonContainer type="submit" form="homeForm">
        <Play size={26} />
        Começar
      </ButtonContainer>
    </HomeContainer>
  )
}
