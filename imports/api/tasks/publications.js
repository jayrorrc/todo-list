import { Meteor } from 'meteor/meteor'

import { Task } from '/imports/db/TasksCollection'
import { Status } from '/imports/db/TasksStatus'

Meteor.publish('tasks', function publishTasks({ hideCompleted }) {
  const filter = {
    $or: [
      { private: false },
      { createdBy: this.userId }
    ]
  }

  if (hideCompleted) {
    filter.status = {
      $ne: Status.DONE
    }
  }

  return Task.find(filter)
})

Meteor.publish('task', function publishTasks({ id }) {
  return Task.find({_id: id})
})