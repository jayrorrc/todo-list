import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import { Tasks } from '/imports/db/TasksCollection'

export function deleteTask(id) {
  check(id, String)

  if (!this.userId) {
    throw new Meteor.Error('Not authorized.')
  }

  const task = Tasks.findOne({ _id: id, createdBy: this.userId })

  if (!task) {
    throw new Meteor.Error('Access denied.')
  }

  Tasks.remove(id)
}