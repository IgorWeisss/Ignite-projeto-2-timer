import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: -3rem;
  gap: 3.5rem;
  width: 100%;
  max-width: 41rem;
  height: 100%;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;

  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  line-height: 1.6;
  font-size: 1.125rem;

  label,
  span {
    color: ${(props) => props.theme['gray-100']};
  }

  input {
    padding: 0.6875rem 0.5rem;
    background-color: transparent;
    border: 0;
    border-bottom: 2px solid ${(props) => props.theme['gray-500']};
    color: ${(props) => props.theme['gray-100']};

    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 1.125rem;

    &::-webkit-calendar-picker-indicator {
      display: none !important;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
  }

  input::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  input:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  div {
    display: flex;
    align-items: center;
    position: relative;
    width: 4.5rem;
    gap: 0.5rem;
  }

  button {
    position: absolute;
    background-color: transparent;
    border: 0;
    color: ${(props) => props.theme['gray-500']};
    width: 1rem;
    transition: color 0.2s;
  }

  button:hover {
    color: ${(props) => props.theme['gray-100']};
  }

  div .decrementButton {
    left: 0.15625rem;
  }

  div .incrementButton {
    right: 0.15625rem;
  }

  #projectName {
    flex: 1;
  }

  #minutesAmount {
    width: 100%;
    text-align: center;
  }
`

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

export const BaseButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;

  width: 100%;
  padding: 1.25rem;
  gap: 0.5rem;

  border: 0;
  border-radius: 8px;
  cursor: pointer;

  color: ${(props) => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartButtonContainer = styled(BaseButtonContainer)`
  background-color: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }
`

export const StopButtonContainer = styled(BaseButtonContainer)`
  background-color: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`
