import React from 'react'

import { TaskForm } from './TaskForm'

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button'

import { Status } from '/imports/db/TasksStatus'

export const TaskFormShow = ({
  task, handleStart, handleFinish, handleRestart, handleCancel
}) => {
  const isToDO = task && task.status === Status.TODO
  const isInProgress = task && task.status === Status.IN_PROGRESS

  return (
    <TaskForm
      task={task}
      readOnly={true}
    >
      <ButtonGroup
        fullWidth
        orientation="vertical"
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
        }}
      >
        {
          isToDO
          && (
            <Button
              onClick={handleStart}
            >
              Iniciar tarefa
            </Button>
          )
        }

        {
          isInProgress
          && (
            <Button
              onClick={handleFinish}
            >
              Concluir tarefa
            </Button>
          )
        }

        {
          !isToDO
          && (
            <Button
              onClick={handleRestart}
            >
              Reiniciar tarefa
            </Button>
          )
        }

        <Button
          onClick={handleCancel}
        >
          Voltar
        </Button>
      </ButtonGroup>
    </TaskForm>
  )
}
