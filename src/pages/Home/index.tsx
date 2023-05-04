import { Play } from 'phosphor-react'
import { CounterContainer, CounterSeparator, HomeContainer } from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form id="pomodoroForm">
        <label htmlFor="projectName">Vou trabalhar em </label>
        <input
          type="text"
          id="projectName"
          placeholder="Dê um nome para o seu projeto"
        />
        <label htmlFor="minutesAmount">durante </label>
        <input type="number" id="minutesAmount" />
        <span>minutos.</span>
      </form>

      <CounterContainer>
        <span>0</span>
        <span>0</span>
        <CounterSeparator>:</CounterSeparator>
        <span>0</span>
        <span>0</span>
      </CounterContainer>

      <button type="submit" form="pomodoroForm">
        <Play size={26} />
        Começar
      </button>
    </HomeContainer>
  )
}
