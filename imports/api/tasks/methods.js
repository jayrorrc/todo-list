import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/db/TasksCollection';
import { Status } from '/imports/db/TasksStatus'

Meteor.methods({
  'tasks.summary'() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
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
  }
})