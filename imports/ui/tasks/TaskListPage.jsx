import React, { useState, useEffect, Fragment } from 'react'

import { TaskList } from './TaskList'
import { TaskFormCreateDialog } from './TaskFormCreateDialog'
import { PageLayout } from '../PageLayout'

import Stack from '@mui/material/Stack'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

export const TaskListPage = () => {
  const [ showCompleted, setShowCompleted ] = useState(false)
  const [ filterName, setFilterName ] = useState('')
  const [ openDialog, setOpenDialog ] = useState(false)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ totalPages, setTotalPages ] = useState(1)
  const [ pages, setPages ] = useState([])

  useEffect(() => {
    updateTotalPages()
  }, [ showCompleted, filterName ])

  useEffect(() => {
    const first = currentPage === 1
      ? currentPage
      : currentPage === totalPages
        ? currentPage - 5 < 1
          ? 1
          : currentPage - 5
        : (currentPage - 2) < 1
          ? 1
          : currentPage - 2

    const last = (first + 5) > totalPages
    ? totalPages
    : first + 5

    const arrPages = Array.from({ length: (last - first + 1) }, (_, i) => i + first)
    const pages = [ '<<', '<', ...arrPages, '>', '>>' ]

    setPages(pages)
  }, [ currentPage, totalPages ])

  const addTask = (data) => {
    const dataFormated = { ...data, deadline: data.deadline.toDate() }

    Meteor.call('tasks.create', dataFormated, () => {
      setOpenDialog(false)
      setCurrentPage(1)
    })
  }

  const updateTotalPages = () => {
    Meteor.call('tasks.total', { showCompleted, filterName }, (error, result) => {
      if (error) {
        console.error(error)
        return
      }

      let total = Math.floor(result / 4)

      if (result % 4) {
        total++
      }

      setTotalPages(total)

      if (currentPage > total) {
        setCurrentPage(1)
      }
    })
  }

  const closeDialog = () => {
    setOpenDialog(false)
  }

  const setPage = (val) => {
    let page

    switch (val) {
      case '<<':
        page = 1
        break
      case '<':
        page = currentPage - 1 > 1
          ? currentPage - 1
          : 1

        setCurrentPage(1)
        break
      case '>>':
        page = totalPages
        break
      case '>':
        page = currentPage + 1 < totalPages
          ? currentPage + 1
          : totalPages
        break
      default:
        page = val
    }

    setCurrentPage(page)
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
          currentPage={currentPage}
          skip={(currentPage - 1) * 4}
          handleUpdateTotalPages={updateTotalPages}
        />

        <ButtonGroup
          fullWidth
          variant="contained"
        >
          {
            pages.map((key, i) => (
              <Button
                color={ key === currentPage ? 'primary' : 'info' }
                key={i}
                onClick={() => setPage(key)}
              >
                {key}
              </Button>)
            )
          }
        </ButtonGroup>

        <TaskFormCreateDialog
          open={openDialog}
          handleClose={closeDialog}
          handleSubmit={addTask}
        />
      </Fragment>
    </PageLayout>
  )
}
