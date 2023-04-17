import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'

import { Task } from '/imports/db/TasksCollection'

import { TaskListItem } from './TaskListItem'
import { PageLayout } from '../PageLayout'

import List from '@mui/material/List'

export const TaskList = () => {
  const [ hideCompleted, setHideCompleted ] = useState(true)

  const { tasks, loading } = useTracker(() => {
    const noDataAvailable = { tasks: [] }
    if (!Meteor.user()) {
      return noDataAvailable
    }

    const handlerTasks = Meteor.subscribe('tasks', { hideCompleted })
    const handlerUsersNames = Meteor.subscribe('users.names')

    if (!handlerTasks.ready() || !handlerUsersNames.ready()) {
      return { ...noDataAvailable, loading: true }
    }

    const tasks = Task.find().fetch()

    return { tasks }
  })

  return (
    <PageLayout
      title="Tarefas cadastradas"
      loading={ loading }
    >
      <List>
        {tasks.map((task, i) => TaskListItem({task, key: i}))}
      </List>
    </PageLayout>
  )
}
