import { Meteor } from 'meteor/meteor'

import { Accounts } from 'meteor/accounts-base'
import { Task } from '/imports/db/TasksCollection'
import { Status } from '/imports/db/TasksStatus'

import '/imports/api/tasks'
import '/imports/api/users'

const insertTask = (obj, user) => {
  const task = new Task()

  const date = new Date()
  let [ day, month, year ] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ]

  if (day > 23) {
    day = 1
    month++
  }

  task.name = obj.name
  task.description = obj.description
  task.createdBy = user._id
  task.status = obj.status
  task.private = obj.private
  task.deadline = new Date(year, month, (day + 5))

  task.save()
}

const SEED_USERNAME = 'admin'
const SEED_PASSWORD = 'admin'

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    })
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME)

  if (Task.find().count() === 0) {
    [
      {
        name: 'First Task',
        description: 'First Description',
        status: Status.TODO,
        private: false,
      },
      {
        name: 'Second Task',
        description: 'Second Description',
        status: Status.TODO,
        private: false,
      },
      {
        name: 'Third Task',
        description: 'Third Description',
        status: Status.IN_PROGRESS,
        private: false,
      },
      {
        name: 'Fourth Task',
        description: 'Fourth Description',
        status: Status.IN_PROGRESS,
        private: true,
      },
      {
        name: 'Fifth Task',
        description: 'Fifth Description',
        status: Status.IN_PROGRESS,
        private: false,
      },
      {
        name: 'Sixth Task',
        description: 'Sixth Description',
        status: Status.DONE,
        private: false,
      },
      {
        name: 'Seventh Task',
        description: 'Seventh Description',
        status: Status.DONE,
        private: false,
      },
    ].forEach(taskText => insertTask(taskText, user))
  }
})
