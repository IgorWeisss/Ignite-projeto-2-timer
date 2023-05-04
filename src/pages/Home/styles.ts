import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 40.625rem;
  align-items: center;
  justify-content: center;
  margin-top: -3rem;

  gap: 3.5rem;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;

    flex-wrap: wrap;

    -webkit-font-smoothing: antialiased;
    font-size: 1.125rem;
    font-weight: bold;
    line-height: 1.6;
    color: ${(props) => props.theme['gray-100']};
  }

  form input {
    padding: 0.5rem 0.6875rem;

    font-family: 'Roboto', sans-serif;
    font-size: 1.125rem;
    font-weight: bold;

    background-color: transparent;
    border: 0;
    border-bottom: 2px solid ${(props) => props.theme['gray-500']};
    color: ${(props) => props.theme['gray-100']};
  }

  form::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  #projectName {
    width: 16.875rem;
  }

  #minutesAmount {
    width: 4.625rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1.25rem;
    width: 100%;
    border-radius: 8px;
    border: 0;
    gap: 0.5rem;
    cursor: pointer;

    background-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['gray-100']};
  }
`

export const CounterContainer = styled.main`
  display: flex;
  gap: 1rem;

  width: 100%;

  font-family: 'Roboto-mono', monospace;
  font-size: 10rem;
  line-height: 7.5rem;
  font-weight: bold;

  span {
    display: flex;
    padding: 2.5rem 1rem;
    width: 8rem;
    align-items: center;
    justify-content: center;

    background-color: ${(props) => props.theme['gray-700']};
    border-radius: 8px;
  }
`

export const CounterSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;

  font-family: 'Roboto-mono', monospace;
  color: ${(props) => props.theme['green-500']};
`
