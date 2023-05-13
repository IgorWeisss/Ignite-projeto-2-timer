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
