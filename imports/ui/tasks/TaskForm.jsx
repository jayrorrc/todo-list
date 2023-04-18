import React, { useState, useEffect, Fragment } from 'react'

import { Status } from '/imports/db/TasksStatus'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import dayjs from 'dayjs'

export const TaskForm = ({ task, handleSubmit, readOnly, children }) => {
  const STATUS = Status.getValues().map(s => ({ value: s, label: s }))

  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ status, setStatus ] = useState(Status.TODO)
  const [ deadline, setDeadline ] = useState(dayjs())
  const [ privateTask, setPrivate ] = useState(false)

  useEffect(() => {
    if (!task) {
      return
    }

    setName(task.name)
    setDescription(task.description)
    setStatus(task.status)
    setDeadline(dayjs(task.deadline))
    setPrivate(task.private)
  }, [task]);

  const submit = (e) => {
    e.preventDefault()

    if (handleSubmit) {
      handleSubmit({
        name,
        description,
        status,
        deadline,
        private: privateTask
      })
    }
  }

  return (
    <Fragment>
      <Box
        component="form"
        onSubmit={submit}
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
          InputProps={{
            readOnly
          }}
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
          InputProps={{
            readOnly
          }}
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
          InputProps={{
            readOnly
          }}
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
          readOnly={readOnly}
          onChange={val => setDeadline(val)}
        />

        {
          readOnly
            ? privateTask
            && (
              <Chip
                label="Tarefa pessoal"
                sx={{mt: 1}}
              />
            )
            : (
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
          )
        }

        {children}
      </Box>
    </Fragment>
  )
}