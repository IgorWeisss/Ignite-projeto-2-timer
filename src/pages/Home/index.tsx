import { NewTaskForm } from './Components/NewTaskForm'
import { Countdown } from './Components/Countdown'

import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StopButtonContainer,
  StartButtonContainer,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useContext } from 'react'
import { TasksContext } from '../../Contexts/TasksContextProvider'

const newTaskFormValidationSchema = z.object({
  projectName: z.string().min(1, 'Informe o nome do projeto'),
  minutesAmount: z
    .number()
    .min(5, 'A duração mínima é de 5 minutos')
    .max(60, 'A duração máxima é de 60 minutos'),
})

export type NewTaskFormData = z.infer<typeof newTaskFormValidationSchema>

export function Home() {
  const { activeTask, createNewTask, interruptTask } = useContext(TasksContext)

  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      projectName: '',
    },
  })

  const { handleSubmit, watch /* reset */ } = newTaskForm

  const projectName = watch('projectName')
  const isSubmitButtonDisabled = !projectName

  return (
    <HomeContainer>
      <form id="homeForm" onSubmit={handleSubmit(createNewTask)}>
        <FormProvider {...newTaskForm}>
          <NewTaskForm />
        </FormProvider>
        <Countdown />
        {activeTask ? (
          <StopButtonContainer type="button" onClick={interruptTask}>
            <HandPalm size={26} />
            Interromper
          </StopButtonContainer>
        ) : (
          <StartButtonContainer
            disabled={isSubmitButtonDisabled}
            type="submit"
            form="homeForm"
          >
            <Play size={26} />
            Começar
          </StartButtonContainer>
        )}
      </form>
    </HomeContainer>
  )
}
