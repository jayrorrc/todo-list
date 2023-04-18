import React, { useState } from 'react'
import { useParams } from "react-router"
import { useTracker } from 'meteor/react-meteor-data'

import { useNavigate } from "react-router-dom"

import { TaskFormEdit } from './TaskFormEdit'
import { TaskFormShow } from './TaskFormShow'
import { PageLayout } from '../PageLayout'

import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import { Task } from '/imports/db/TasksCollection'

export const TaskComponent = () => {
  const { id } = useParams()
  const [ edit, setEdit ] = useState(false)

  const navigate = useNavigate()

  const { task, loading } = useTracker(() => {
    const noDataAvailable = {}
    if (!Meteor.user()) {
      return noDataAvailable
    }

    const handlerTasks = Meteor.subscribe('task', { id })

    if (!handlerTasks.ready()) {
      return { ...noDataAvailable, loading: true }
    }

    const task = Task.findOne({ _id: id })
    return { task, loading: false }
  })

  const getTitle = () => {
    if (!task) {
      return
    }

    if (edit) {
      return (
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: 'center', m: 1 }}
        >
          Editar tarefa: {task?.name}
        </Typography>
      )
    }

    return (
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          m: 1
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: 'center' }}
        >
          {task?.name}
        </Typography>
        {
          !edit
          && (
            <IconButton
              onClick={() => setEdit(true)}
              sx={{ml: 1}}
            >
              <EditIcon />
            </IconButton>
          )
        }
      </Stack>
    )
  }

  const taskStart = () => {
    Meteor.call('tasks.start', id)
  }

  const taskFinish = () => {
    Meteor.call('tasks.finish', id)
  }

  const taskRestart = () => {
    Meteor.call('tasks.restart', id)
  }

  const taskUpdate = (data) => {
    const dataFormated = { ...data, deadline: data.deadline.toDate() }

    Meteor.call('tasks.update', id, dataFormated, () => {
      setEdit(false)
    })

  }

  return (
    <PageLayout
      titleComponent={getTitle()}
      loading={loading}
    >
      {
        edit
          ? (
            <TaskFormEdit
              task={task}
              handleSubmit={taskUpdate}
              handleCancel={() => setEdit(false)}
            />
          ) : (
            <TaskFormShow
              task={task}
              handleStart={taskStart}
              handleFinish={taskFinish}
              handleRestart={taskRestart}
              handleCancel={() => navigate('/tasks')}
            />
          )
      }
    </PageLayout>
  )
}
