import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import { Task } from '/imports/db/TasksCollection'
import { Status } from '/imports/db/TasksStatus'

export function finish(id) {
  check(id, String)

  if (!this.userId) {
    throw new Meteor.Error('Not authorized.')
  }

  const task = Task.findOne({ _id: id })

  if (!task) {
    throw new Meteor.Error('Document not found.')
  }

  if (task.createdBy !== this.userId) {
    throw new Meteor.Error('Not authorized.')
  }

  if (task.status !== Status.IN_PROGRESS) {
    throw new Meteor.Error('Not authorized.')
  }

  task.status = Status.DONE
  task.save()
}