import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { TaskFormCreate } from './TaskFormCreate'

export const TaskFormCreateDialog = ({open, handleClose, handleSubmit}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Criar Tarefa</DialogTitle>
      <DialogContent>
        <TaskFormCreate
          handleSubmit={handleSubmit}
          handleCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}