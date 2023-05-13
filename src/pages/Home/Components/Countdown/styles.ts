import styled from 'styled-components'

export const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  font-family: 'Roboto mono', monospace;
  font-size: 10rem;
  font-weight: bold;
  line-height: 12.5rem;

  .numbers {
    display: flex;
    gap: 1rem;
  }

  .numbers span {
    padding: 0 1rem;

    background-color: ${(props) => props.theme['gray-700']};
    color: ${(props) => props.theme['gray-100']};
    border-radius: 8px;
  }

  .separator {
    flex: 1;
    text-align: center;
    color: ${(props) => props.theme['green-500']};
  }
`
