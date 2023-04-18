import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check';

import { Tasks, Task } from '/imports/db/TasksCollection'
import { Status } from '/imports/db/TasksStatus'

Meteor.methods({
  'tasks.summary'() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.')
    }

    const collection = Tasks.rawCollection()
    const results = collection.aggregate([
      {
        $project: {
          toDo: {
            $cond: [ { $eq: ["$status", Status.TODO ] }, 1, 0]
          },
          inProgress: {
            $cond: [ { $eq: ["$status", Status.IN_PROGRESS ] }, 1, 0]
          },
          done: {
            $cond: [ { $eq: ["$status", Status.DONE ] }, 1, 0]
          }
        }
      },
      {
        $group: {
          _id: null,
          toDo: {
            $sum: "$toDo"
          },
          inProgress: {
            $sum: "$inProgress"
          },
          done: {
            $sum: "$done"
          }
        }
      },
      {
        $project: {
          toDo: { $toString: "$toDo" },
          inProgress: { $toString: "$inProgress" },
          done: { $toString: "$done" }
        }
      }
    ]).toArray()

    return results
  },

  'tasks.start'(id) {
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

    if (task.status !== Status.TODO) {
      throw new Meteor.Error('Not authorized.')
    }

    task.status = Status.IN_PROGRESS
    task.save()
  },

  'tasks.finish'(id) {
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
  },

  'tasks.restart'(id) {
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

    if (task.status === Status.TODO) {
      throw new Meteor.Error('Not authorized.')
    }

    task.status = Status.TODO
    task.save()
  },

  'tasks.update'(id, data) {

    console.log('id', id)
    console.log('data', data)

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
  },

  'tasks.create'(data) {
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
  },
})