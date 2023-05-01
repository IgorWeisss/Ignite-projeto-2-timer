import { ThemeProvider } from 'styled-components'
import { Button } from './components/Button'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <Button />
      <Button />
      <Button />
      <Button />
    </ThemeProvider>
  )
}
