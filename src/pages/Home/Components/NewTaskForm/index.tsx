import { Minus, Plus } from 'phosphor-react'
import { FormContainer } from './styles'

import { TasksContext } from '../..'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

export function NewTaskForm() {
  const { activeTask } = useContext(TasksContext)
  const { register, setValue, getValues } = useFormContext()

  function handleIncrementMinutesAmount() {
    let actualValue = getValues('minutesAmount')

    if (actualValue === 60) {
      return
    }
    if (!actualValue) {
      actualValue = 0
    }

    const newValue = actualValue + 5

    setValue('minutesAmount', newValue)
  }

  function handleDecrementMinutesAmount() {
    const actualValue = getValues('minutesAmount')
    if (actualValue === 5) {
      return
    }
    const newValue = actualValue - 5

    setValue('minutesAmount', newValue)
  }

  return (
    <FormContainer>
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
