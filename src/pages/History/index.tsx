import { useContext } from 'react'
import { HystoryContainer, HystoryList, Status } from './styles'
import { TasksContext } from '../../Contexts/TasksContextProvider'

export function History() {
  const { tasks } = useContext(TasksContext)

  return (
    <HystoryContainer>
      <h1>Meu Histórico</h1>

      <HystoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.projectName}</td>
                  <td>{task.minutesAmount} minutos</td>
                  <td>{task.startTime.toISOString()}</td>
                  <td>
                    {task.finishedTime && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {task.interruptedTime && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!task.interruptedTime && !task.finishedTime && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HystoryList>
    </HystoryContainer>
  )
}
