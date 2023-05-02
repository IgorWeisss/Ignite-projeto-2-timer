import { NavLink } from 'react-router-dom'
import { Logo } from '../Logo'
import { HeaderContainer } from './styles'
import { Scroll, Timer } from 'phosphor-react'

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <nav>
        <NavLink to={'/'} title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to={'/historico'} title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
