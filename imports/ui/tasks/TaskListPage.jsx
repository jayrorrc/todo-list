import React, { useState, Fragment } from 'react'

import { TaskList } from './TaskList'
import { TaskFormCreateDialog } from './TaskFormCreateDialog'
import { PageLayout } from '../PageLayout'

import Stack from '@mui/material/Stack'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'

export const TaskListPage = () => {
  const [ showCompleted, setShowCompleted ] = useState(false)
  const [ filterName, setFilterName ] = useState('')
  const [openDialog, setOpenDialog] = useState(false)

  const addTask = (data) => {
    const dataFormated = { ...data, deadline: data.deadline.toDate() }

    Meteor.call('tasks.create', dataFormated, () => {
      setOpenDialog(false)
    })


  }

  const closeDialog = () => {
    setOpenDialog(false)
  }

  return (
    <PageLayout
      title="Tarefas cadastradas"
    >
      <Fragment>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={showCompleted}
                onChange={e => setShowCompleted(e.target.checked)}
              />
            }
            label="Todas"
          />

          <TextField
            id="filter"
            label="Filtrar"
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
          />

          <IconButton
            onClick={() => setOpenDialog(true)}
            sx={{ml: 1}}
          >
            <AddIcon color='primary' />
          </IconButton>
        </Stack>

        <TaskList
          all={showCompleted}
          filterByName={filterName}
        />

        <TaskFormCreateDialog
          open={openDialog}
          handleClose={closeDialog}
          handleSubmit={addTask}
        />
      </Fragment>
    </PageLayout>
  )
}
