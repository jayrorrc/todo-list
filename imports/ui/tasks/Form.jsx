import React, { useState, Fragment } from 'react'

import { Status } from '/imports/db/TasksStatus'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import dayjs from 'dayjs'

export const Form = ({ task, handleSubmit, children }) => {
  const STATUS = Status.getValues().map(s => ({ value: s, label: s }))

  const [ name, setName ] = useState(task ? task.name : '')
  const [ description, setDescription ] = useState(task ? task.description : '')
  const [ status, setStatus ] = useState(task ? task.status : Status.TODO)
  const [ deadline, setDeadline ] = useState(task ? task.deadline : dayjs())
  const [ privateTask, setPrivate ] = useState(task ? task.private : false)

  return (
    <Fragment>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          borderRadius: 1,
          boxShadow: 2
        }}
      >
        <TextField
          id="name"
          label="Nome"
          required
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{ my: 2 }}
        />

        <TextField
          id="description"
          label="Descrição"
          required
          fullWidth
          multiline
          value={description}
          onChange={e => setDescription(e.target.value)}
          sx={{ my: 2 }}
        />

        <TextField
          id="status"
          label="Situação"
          required
          fullWidth
          select
          value={status}
          defaultValue={Status.TODO}
          onChange={e => setStatus(e.target.value)}
          sx={{ my: 2 }}
        >
          {STATUS.map((option, i) => (
            <MenuItem key={i} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <DateTimePicker
          id="deadline"
          label="Data"
          slotProps={{
            textField: {
              fullWidth: true
            }
          }}
          value={deadline}
          onChange={val => setDeadline(val)}
        />

        <FormControlLabel
          value="private"
          control={
            <Checkbox
              checked={privateTask}
              onChange={e => setPrivate(e.target.checked)}
            />
          }
          label="Pessoal"
          labelPlacement="start"
        />

        {children}
      </Box>
    </Fragment>
  )
}