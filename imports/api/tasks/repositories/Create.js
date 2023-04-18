import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import { Task } from '/imports/db/TasksCollection'
import { Status } from '/imports/db/TasksStatus'

export function create(data) {
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

  const task = new Task()

  task.name = data.name
  task.description = data.description
  task.status = data.status
  task.deadline = data.deadline
  task.private = data.private
  task.createdBy = this.userId
  task.save()
}