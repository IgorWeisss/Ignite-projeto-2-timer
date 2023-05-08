import { Play } from 'phosphor-react'
import {
  ButtonContainer,
  CounterContainer,
  HomeContainer,
  FormContainer,
} from './styles'
import { useForm } from 'react-hook-form'

function handleCreateNewTask(data: any) {
  console.log(data)
}

export function Home() {
  const { register, handleSubmit, watch } = useForm()
  const projectName = watch('projectName')
  const isSubmitButtonDisabled = !projectName

  return (
    <HomeContainer>
      <FormContainer id="homeForm" onSubmit={handleSubmit(handleCreateNewTask)}>
        <label htmlFor="projectName">Vou trabalhar em</label>
        <input
          type="text"
          id="projectName"
          placeholder="Dê um nome para o seu projeto"
          list="sugestionsList"
          autoComplete="off"
          {...register('projectName')}
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
          {...register('minutesAmount', { valueAsNumber: true })}
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
      <ButtonContainer
        disabled={isSubmitButtonDisabled}
        type="submit"
        form="homeForm"
      >
        <Play size={26} />
        Começar
      </ButtonContainer>
    </HomeContainer>
  )
}
