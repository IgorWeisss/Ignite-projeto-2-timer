import { ButtonContainer, ButtonVariants } from './Button.styles'

interface ButtonProps {
  variant?: ButtonVariants
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return (
    <ButtonContainer variant={variant}>Pressione</ButtonContainer>
  )
}