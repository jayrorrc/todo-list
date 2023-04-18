import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import { Task } from '/imports/db/TasksCollection'
import { Status } from '/imports/db/TasksStatus'

export function restart(id) {
  check(id, String)

  if (!this.userId) {
    throw new Meteor.Error('Not authorized.')
  }

  const task = Task.findOne({ _id: id, createdBy: this.userId });

  if (!task) {
    throw new Meteor.Error('Access denied.');
  }

  if (task.status === Status.TODO) {
    throw new Meteor.Error('Not authorized.')
  }

  task.status = Status.TODO
  task.save()
}