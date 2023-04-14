import { Mongo } from 'meteor/mongo';

import {
  Class,
  Enum
} from 'meteor/jagi:astronomy';

const Status = Enum.create({
  name: 'Status',
  identifiers: {
    TODO: 'Cadastrada',
    IN_PROGRESS: 'Em Andamento',
    DONE: 'Concluida',
  }
});

const Tasks = new Mongo.Collection('tasks');

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
      const owner = Meteor.users.findOne(this.createdBy)

      return owner.username
    }
  }
})

export { Task, Tasks }