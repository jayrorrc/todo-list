import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import { Task } from '/imports/db/TasksCollection'
import { Status } from '/imports/db/TasksStatus'

export function update(id, data) {
  check(data, {
    name: String,
    description: String,
    status: Match.OneOf(...Status.getValues()),
    deadline: Date,
    private: Boolean
  })

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

  task.name = data.name
  task.description = data.description
  task.status = data.status
  task.deadline = data.deadline
  task.private = data.private
  task.save()
}