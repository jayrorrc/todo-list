import React from 'react'

import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import { TaskListItemOptions } from './TaskListItemOptions'

export const TaskListItem = ({ task, key }) => {
  const getTaskName = () => {
    const date = new Date(task.deadline)
    let [ day, month, year, hour, minutes ] = [
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
      date.getHours(),
      date.getMinutes(),
    ];

    day = day < 10 ? `0${day}` : day
    month++
    month = month < 10 ? `0${month}` : month

    hour = hour < 10 ? `0${hour}` : hour
    minutes = minutes < 10 ? `0${minutes}`: minutes

    return `${day}/${month}/${year} ${hour}:${minutes} - ${task.name}`
  }

  return (
    <ListItem
      key={task._id}
      sx={{ bgcolor: (key % 2) ? '#cccbcb' : '#e5e5e5' }}
    >
      <ListItemAvatar>
        <Avatar>
          <PendingActionsIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={getTaskName()}
        secondary={task.getOwnerName()}
      />
      <ListItemSecondaryAction>
        <TaskListItemOptions />
      </ListItemSecondaryAction>
    </ListItem>
  )
}
