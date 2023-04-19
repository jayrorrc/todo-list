import { Mongo } from 'meteor/mongo'

import { Class } from 'meteor/jagi:astronomy'

import { Status } from './TasksStatus'
import { User } from './UsersCollection'

const Tasks = new Mongo.Collection('tasks')

const Task = Class.create({
  name: 'Task',
  collection: Tasks,
  fields: {
    name: String,
    description: String,
    createdBy: String,
    status: Status,
    deadline: Date,
    private: {
      type: Boolean,
      default: false
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  },
  helpers: {
    getOwnerName() {
      const owner = User.findOne({_id: this.createdBy})
      return owner?.profile?.name || owner?.username
    }
  }
})

export { Task, Tasks }