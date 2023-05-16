import { useContext, useEffect } from 'react'
import { CounterContainer } from './styles'
import { differenceInSeconds } from 'date-fns'
import { TasksContext } from '../../../../Contexts/TasksContextProvider'

export function Countdown() {
  const {
    activeTask,
    activeTaskId,
    secondsPassed,
    markCurrentTaskAsFinished,
    updateSecondsPassed,
  } = useContext(TasksContext)

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
          markCurrentTaskAsFinished()
          updateSecondsPassed(taskTotalTimeInSeconds)
          clearInterval(interval)
        }
        updateSecondsPassed(secondsDifference)
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeTask,
    activeTaskId,
    taskTotalTimeInSeconds,
    markCurrentTaskAsFinished,
    updateSecondsPassed,
  ])

  useEffect(() => {
    if (activeTask) {
      document.title = `${activeTask.projectName} - ${minutesDisplayed}:${secondsDisplayed}`
      return
    }
    document.title = 'Ignite Timer'
  }, [activeTask, minutesDisplayed, secondsDisplayed])

  return (
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
  )
}
