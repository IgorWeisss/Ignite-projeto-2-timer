import styled from "styled-components";

export type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariants
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 100px;
  background-color: ${props => props.theme[props.variant]}
`