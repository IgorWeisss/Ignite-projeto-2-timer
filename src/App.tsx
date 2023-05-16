import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { TasksContextProvider } from './Contexts/TasksContextProvider'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <TasksContextProvider>
          <GlobalStyles />
          <Router />
        </TasksContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
