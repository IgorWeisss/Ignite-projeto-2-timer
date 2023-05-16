import { useContext } from 'react'
import { HystoryContainer, HystoryList, Status } from './styles'
import { TasksContext } from '../../Contexts/TasksContextProvider'

export function History() {
  const { tasks } = useContext(TasksContext)

  return (
    <HystoryContainer>
      <h1>Meu Histórico</h1>

      <pre>{JSON.stringify(tasks, null, 2)}</pre>

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
            <tr>
              <td>Estudar React</td>
              <td>5 minutos</td>
              <td>Há cerca de 1 mês</td>
              <td>
                <Status statusColor="yellow">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>5 minutos</td>
              <td>Há cerca de 1 mês</td>
              <td>
                <Status statusColor="red">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>5 minutos</td>
              <td>Há cerca de 1 mês</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>5 minutos</td>
              <td>Há cerca de 1 mês</td>
              <td>
                <Status statusColor="yellow">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>5 minutos</td>
              <td>Há cerca de 1 mês</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>5 minutos</td>
              <td>Há cerca de 1 mês</td>
              <td>
                <Status statusColor="yellow">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>5 minutos</td>
              <td>Há cerca de 1 mês</td>
              <td>
                <Status statusColor="red">Concluído</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HystoryList>
    </HystoryContainer>
  )
}
