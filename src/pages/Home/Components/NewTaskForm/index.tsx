import { Minus, Plus } from 'phosphor-react'
import { FormContainer } from './styles'

import { Tasks, TasksContext } from '../..'
import { useContext } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const newTaskFormValidationSchema = z.object({
  projectName: z.string().min(1, 'Informe o nome do projeto'),
  minutesAmount: z
    .number()
    .min(5, 'A duração mínima é de 5 minutos')
    .max(60, 'A duração máxima é de 60 minutos'),
})

export type NewTaskFormData = z.infer<typeof newTaskFormValidationSchema>

export function NewTaskForm() {
  const { activeTask, updateTasksAndTaskId } = useContext(TasksContext)

  const { register, handleSubmit, watch, reset, getValues, setValue } =
    useForm<NewTaskFormData>({
      resolver: zodResolver(newTaskFormValidationSchema),
      defaultValues: {
        projectName: '',
      },
    })

  const projectName = watch('projectName')
  const isSubmitButtonDisabled = !projectName

  function handleCreateNewTask(data: NewTaskFormData) {
    const newTask: Tasks = {
      id: String(new Date().getTime()),
      projectName: data.projectName,
      minutesAmount: data.minutesAmount,
      startTime: new Date(),
    }

    updateTasksAndTaskId(newTask)

    reset()
  }

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
