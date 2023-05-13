import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { differenceInSeconds } from 'date-fns'

import { HandPalm, Minus, Play, Plus } from 'phosphor-react'
import {
  CounterContainer,
  HomeContainer,
  FormContainer,
  StopButtonContainer,
  StartButtonContainer,
} from './styles'
import { NewTaskForm } from './Components/NewTaskForm'
import { Countdown } from './Components/Countdown'

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
  interruptedTime?: Date
  finishedTime?: Date
}

export function Home() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const activeTask = tasks.find((task) => task.id === activeTaskId)

  const taskTotalTimeInSeconds = activeTask ? activeTask.minutesAmount * 60 : 0
  const secondsLeft = activeTask ? taskTotalTimeInSeconds - secondsPassed : 0
  const totalTimeInMinutes = Math.floor(secondsLeft / 60)
  const totalTimeInSeconds = secondsLeft % 60

  const minutesDisplayed = String(totalTimeInMinutes).padStart(2, '0')
  const secondsDisplayed = String(totalTimeInSeconds).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeTask) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeTask.startTime,
        )
        if (secondsDifference >= taskTotalTimeInSeconds) {
          setTasks((state) =>
            state.map((task) => {
              if (task.id === activeTaskId) {
                return {
                  ...task,
                  finishedTime: new Date(),
                }
              }

              return task
            }),
          )
          setSecondsPassed(taskTotalTimeInSeconds)
          setActiveTaskId(null)
          clearInterval(interval)
        }
        setSecondsPassed(secondsDifference)
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeTask, activeTaskId, taskTotalTimeInSeconds])

  useEffect(() => {
    if (activeTask) {
      document.title = `${activeTask.projectName} - ${minutesDisplayed}:${secondsDisplayed}`
      return
    }
    document.title = 'Ignite Timer'
  }, [activeTask, minutesDisplayed, secondsDisplayed])

  const { register, handleSubmit, watch, reset, getValues, setValue } =
    useForm<NewTaskFormData>({
      resolver: zodResolver(newTaskFormValidationSchema),
      defaultValues: {
        projectName: '',
        // minutesAmount: 0,
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

  function handleInterruptTask() {
    setTasks((state) =>
      state.map((task) => {
        if (task.id === activeTaskId) {
          return {
            ...task,
            interruptedTime: new Date(),
          }
        }

        return task
      }),
    )
    setActiveTaskId(null)
  }

  return (
    <HomeContainer>
      <NewTaskForm />
      <Countdown />
      {activeTask ? (
        <StopButtonContainer type="button" onClick={handleInterruptTask}>
          <HandPalm size={26} />
          Interromper
        </StopButtonContainer>
      ) : (
        <StartButtonContainer
          disabled={isSubmitButtonDisabled}
          type="submit"
          form="homeForm"
        >
          <Play size={26} />
          Começar
        </StartButtonContainer>
      )}
    </HomeContainer>
  )
}
