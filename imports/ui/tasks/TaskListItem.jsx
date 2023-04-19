import React from 'react'

import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

import { Status } from '/imports/db/TasksStatus'

import { TaskListItemOptions } from './TaskListItemOptions'

export const TaskListItem = ({ task, userId, key }) => {
  const getTaskName = () => {
    const date = new Date(task.deadline)
    let [ day, month, year, hour, minutes ] = [
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
      date.getHours(),
      date.getMinutes(),
    ]

    day = day < 10 ? `0${day}` : day
    month++
    month = month < 10 ? `0${month}` : month

    hour = hour < 10 ? `0${hour}` : hour
    minutes = minutes < 10 ? `0${minutes}`: minutes

    return `${day}/${month}/${year} ${hour}:${minutes} - ${task.name}`
  }

  const isDone = task.status === Status.DONE
  const allowEdit = userId === task.createdBy

  return (
    <ListItem
      key={task._id}
      sx={{
        bgcolor: (key % 2) ? 'primary.main' : 'info.main',
        color: '#d1e5f9'
      }}
    >
      <ListItemAvatar>
        <Avatar>
          {
            isDone
              ? <AssignmentTurnedInIcon color='primary' />
              : <PendingActionsIcon color='primary' />
          }
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={getTaskName()}
        secondary={task.getOwnerName()}
      />
      {
        allowEdit
        && (
          <ListItemSecondaryAction>
            <TaskListItemOptions
              id={task._id}
            />
          </ListItemSecondaryAction>
        )
      }
    </ListItem>
  )
}
