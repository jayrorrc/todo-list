import React, { useState, useEffect } from 'react'

import { useTracker } from 'meteor/react-meteor-data'
import { useAuth } from "/imports/hooks/use-auth"

import { Task } from '/imports/db/TasksCollection'

import { TaskListItem } from './TaskListItem'

import List from '@mui/material/List'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { Troubleshoot } from '@mui/icons-material'

export const TaskList = ({all, filterByName, skip, handleUpdateTotalPages}) => {
  const { currentUser } = useAuth()
  const [ showCompleted, setShowCompleted ] = useState(false)
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    setShowCompleted(all)
    setFilterName(filterByName)
  }, [ all, filterByName ])

  const { tasks, loading } = useTracker(() => {
    const noDataAvailable = { tasks: [] }
    if (!Meteor.user()) {
      return noDataAvailable
    }

    const handlerTasks = Meteor.subscribe('tasks', { showCompleted, filterName, skip })
    const handlerUsersNames = Meteor.subscribe('users.names')

    if (!handlerTasks.ready() || !handlerUsersNames.ready()) {
      return { ...noDataAvailable, loading: true }
    }

    const tasks = Task.find({}, {sort: { deadline: 1, createdAt: -1 }}).fetch()
    handleUpdateTotalPages()

    return { tasks }
  })

  if (loading) {
    return (
      <Stack spacing={1} sx={{m:2}}>
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rectangular" height={60} />
      </Stack>
    )
  }

  return (
    <List>
      {
        tasks.map((task, i) =>
          TaskListItem({
            task,
            userId: currentUser._id,
            key: i
          }))
      }
    </List>
  )
}
