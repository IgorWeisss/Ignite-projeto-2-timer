import { createContext, useState } from 'react'

import { NewTaskForm } from './Components/NewTaskForm'
import { Countdown } from './Components/Countdown'

import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StopButtonContainer,
  StartButtonContainer,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface Tasks {
  id: string
  projectName: string
  minutesAmount: number
  startTime: Date
  interruptedTime?: Date
  finishedTime?: Date
}

interface TaskContextData {
  activeTask: Tasks | undefined
  activeTaskId: string | null
  secondsPassed: number
  markCurrentTaskAsFinished: () => void
  updateSecondsPassed: (seconds: number) => void
}

export const TasksContext = createContext({} as TaskContextData)

const newTaskFormValidationSchema = z.object({
  projectName: z.string().min(1, 'Informe o nome do projeto'),
  minutesAmount: z
    .number()
    .min(5, 'A duração mínima é de 5 minutos')
    .max(60, 'A duração máxima é de 60 minutos'),
})

export type NewTaskFormData = z.infer<typeof newTaskFormValidationSchema>

export function Home() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  function updateSecondsPassed(seconds: number) {
    setSecondsPassed(seconds)
  }

  const activeTask = tasks.find((task) => task.id === activeTaskId)

  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      projectName: '',
    },
  })

  const { handleSubmit, watch, reset } = newTaskForm

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

  function markCurrentTaskAsFinished() {
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
    setActiveTaskId(null)
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
      <form id="homeForm" onSubmit={handleSubmit(handleCreateNewTask)}>
        <TasksContext.Provider
          value={{
            activeTask,
            activeTaskId,
            secondsPassed,
            markCurrentTaskAsFinished,
            updateSecondsPassed,
          }}
        >
          <FormProvider {...newTaskForm}>
            <NewTaskForm />
          </FormProvider>
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
        </TasksContext.Provider>
      </form>
    </HomeContainer>
  )
}
