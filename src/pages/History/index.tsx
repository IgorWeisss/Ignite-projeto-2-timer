import { HystoryContainer, HystoryList, Status } from './styles'

export function History() {
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
