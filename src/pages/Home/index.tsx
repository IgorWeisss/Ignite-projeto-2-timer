import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Play } from 'phosphor-react'
import {
  ButtonContainer,
  CounterContainer,
  HomeContainer,
  FormContainer,
} from './styles'

const newTaskFormValidationSchema = z.object({
  projectName: z.string().min(1, 'Informe o nome do projeto'),
  minutesAmount: z
    .number()
    .min(5, 'A duração mínima é de 5 minutos')
    .max(60, 'A duração máxima é de 60 minutos'),
})

type NewTaskFormData = z.infer<typeof newTaskFormValidationSchema>

interface Tasks {
  id: string
  projectName: string
  minutesAmount: number
}

export function Home() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      projectName: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewTask(data: NewTaskFormData) {
    const newTask: Tasks = {
      id: String(new Date().getTime()),
      projectName: data.projectName,
      minutesAmount: data.minutesAmount,
    }

    setTasks((state) => [...state, newTask])
    setActiveTaskId(newTask.id)

    reset()
  }

  const projectName = watch('projectName')
  const isSubmitButtonDisabled = !projectName
  const activeTask = tasks.find((task) => task.id === activeTaskId)

  console.log(activeTask)

  return (
    <HomeContainer>
      <FormContainer id="homeForm" onSubmit={handleSubmit(handleCreateNewTask)}>
        <label htmlFor="projectName">Vou trabalhar em</label>
        <input
          type="text"
          id="projectName"
          placeholder="Dê um nome para o seu projeto"
          list="sugestionsList"
          autoComplete="off"
          {...register('projectName')}
        />

        <datalist id="sugestionsList">
          <option value="Front-end" />
          <option value="Back-end" />
          <option value="Full-Stack" />
        </datalist>

        <label htmlFor="minutesAmount">durante</label>
        <input
          type="number"
          id="minutesAmount"
          placeholder="00"
          min={5}
          max={60}
          step={5}
          required
          {...register('minutesAmount', { valueAsNumber: true })}
        />
        <span>minutos.</span>
      </FormContainer>
      <CounterContainer>
        <div className="numbers">
          <span>0</span>
          <span>0</span>
        </div>
        <span className="separator">:</span>
        <div className="numbers">
          <span>0</span>
          <span>0</span>
        </div>
      </CounterContainer>
      <ButtonContainer
        disabled={isSubmitButtonDisabled}
        type="submit"
        form="homeForm"
      >
        <Play size={26} />
        Começar
      </ButtonContainer>
    </HomeContainer>
  )
}
