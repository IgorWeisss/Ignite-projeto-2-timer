import { createContext, useState } from 'react'

import { NewTaskForm } from './Components/NewTaskForm'
import { Countdown } from './Components/Countdown'

import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StopButtonContainer,
  StartButtonContainer,
} from './styles'

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
  markCurrentTaskAsFinished: () => void
  updateTasksAndTaskId: (task: Tasks) => void
}

export const TasksContext = createContext({} as TaskContextData)

export function Home() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)

  const activeTask = tasks.find((task) => task.id === activeTaskId)

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

  function updateTasksAndTaskId(task: Tasks) {
    setTasks((state) => [...state, task])
    setActiveTaskId(task.id)
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
      <TasksContext.Provider
        value={{
          activeTask,
          activeTaskId,
          markCurrentTaskAsFinished,
          updateTasksAndTaskId,
        }}
      >
        <NewTaskForm />
        <Countdown />
        {activeTask ? (
          <StopButtonContainer type="button" onClick={handleInterruptTask}>
            <HandPalm size={26} />
            Interromper
          </StopButtonContainer>
        ) : (
          <StartButtonContainer
            // disabled={isSubmitButtonDisabled}
            type="submit"
            form="homeForm"
          >
            <Play size={26} />
            Começar
          </StartButtonContainer>
        )}
      </TasksContext.Provider>
    </HomeContainer>
  )
}
