import React from 'react'

import { TaskForm } from './TaskForm'

import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'

export const TaskFormEdit = ({ task, handleSubmit, handleCancel }) => {
  return (
    <TaskForm
      handleSubmit={handleSubmit}
      task={task}
    >
      <ButtonGroup
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
        }}
      >
        <Button
          onClick={handleCancel}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
        >
          Salvar
        </Button>
      </ButtonGroup>
    </TaskForm>
  )
}
