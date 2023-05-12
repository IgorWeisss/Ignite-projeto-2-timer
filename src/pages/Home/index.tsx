import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Minus, Play, Plus } from 'phosphor-react'
import {
  ButtonContainer,
  CounterContainer,
  HomeContainer,
  FormContainer,
} from './styles'
import { differenceInSeconds } from 'date-fns'

const newTaskFormValidationSchema = z.object({
  projectName: z.string().min(1, 'Informe o nome do projeto'),
  minutesAmount: z
    .number()
    .min(5, 'A duração mínima é de 5 minutos')
    .max(60, 'A duração máxima é de 60 minutos'),
})

type NewTaskFormData = z.infer<typeof newTaskFormValidationSchema>

interface Tasks {
  id: string
  projectName: string
  minutesAmount: number
  startTime: Date
}

export function Home() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const activeTask = tasks.find((task) => task.id === activeTaskId)

  const taskTotalTimeInSeconds = activeTask ? activeTask.minutesAmount * 60 : 0
  const secondsLeft = taskTotalTimeInSeconds - secondsPassed
  const totalTimeInMinutes = Math.floor(secondsLeft / 60)
  const totalTimeInSeconds = secondsLeft % 60

  const minutesDisplayed = String(totalTimeInMinutes).padStart(2, '0')
  const secondsDisplayed = String(totalTimeInSeconds).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeTask) {
      interval = setInterval(() => {
        setSecondsPassed(differenceInSeconds(new Date(), activeTask.startTime))
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeTask])

  const { register, handleSubmit, watch, reset, getValues, setValue } =
    useForm<NewTaskFormData>({
      resolver: zodResolver(newTaskFormValidationSchema),
      defaultValues: {
        projectName: '',
        minutesAmount: 0,
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

    setTasks((state) => [...state, newTask])
    setActiveTaskId(newTask.id)
    setSecondsPassed(0)

    reset()
  }

  function handleIncrementMinutesAmount() {
    const actualValue = getValues('minutesAmount')
    const newValue = actualValue + 5

    setValue('minutesAmount', newValue)
  }

  function handleDecrementMinutesAmount() {
    const actualValue = getValues('minutesAmount')
    const newValue = actualValue - 5

    setValue('minutesAmount', newValue)
  }

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
