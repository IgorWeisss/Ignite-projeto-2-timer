import { ReactNode, createContext, useState } from 'react'

interface TasksContextData {
  children: ReactNode
}

export interface Tasks {
  id: string
  projectName: string
  minutesAmount: number
  startTime: Date
  interruptedTime?: Date
  finishedTime?: Date
}

interface NewTaskFormData {
  projectName: string
  minutesAmount: number
}

interface TaskContextData {
  tasks: Tasks[]
  activeTask: Tasks | undefined
  activeTaskId: string | null
  secondsPassed: number
  markCurrentTaskAsFinished: () => void
  updateSecondsPassed: (seconds: number) => void
  createNewTask: (data: NewTaskFormData) => void
  interruptTask: () => void
}

export const TasksContext = createContext({} as TaskContextData)

export function TasksContextProvider({ children }: TasksContextData) {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  function updateSecondsPassed(seconds: number) {
    setSecondsPassed(seconds)
  }

  const activeTask = tasks.find((task) => task.id === activeTaskId)

  function createNewTask(data: NewTaskFormData) {
    const newTask: Tasks = {
      id: String(new Date().getTime()),
      projectName: data.projectName,
      minutesAmount: data.minutesAmount,
      startTime: new Date(),
    }

    setTasks((state) => [...state, newTask])
    setActiveTaskId(newTask.id)
    setSecondsPassed(0)

    // reset()
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

  function interruptTask() {
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
    <TasksContext.Provider
      value={{
        tasks,
        activeTask,
        activeTaskId,
        secondsPassed,
        markCurrentTaskAsFinished,
        updateSecondsPassed,
        createNewTask,
        interruptTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
