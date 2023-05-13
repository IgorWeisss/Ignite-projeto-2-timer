import { Minus, Plus } from 'phosphor-react'
import { FormContainer } from './styles'

export function NewTaskForm() {
  return (
    <FormContainer id="homeForm" onSubmit={handleSubmit(handleCreateNewTask)}>
      <label htmlFor="projectName">Vou trabalhar em</label>
      <input
        type="text"
        id="projectName"
        placeholder="Dê um nome para o seu projeto"
        list="sugestionsList"
        autoComplete="off"
        disabled={!!activeTask}
        {...register('projectName')}
      />

      <datalist id="sugestionsList">
        <option value="Front-end" />
        <option value="Back-end" />
        <option value="Full-Stack" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <div>
        <button
          className="decrementButton"
          onClick={handleDecrementMinutesAmount}
          type="button"
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          id="minutesAmount"
          placeholder="00"
          min={5}
          max={60}
          step={5}
          required
          disabled={!!activeTask}
          {...register('minutesAmount', { valueAsNumber: true })}
        />
        <button
          className="incrementButton"
          onClick={handleIncrementMinutesAmount}
          type="button"
        >
          <Plus size={16} />
        </button>
      </div>
      <span>minutos.</span>
    </FormContainer>
  )
}
