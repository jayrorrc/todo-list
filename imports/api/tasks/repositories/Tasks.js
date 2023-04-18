import { Task } from '/imports/db/TasksCollection'
import { Status } from '/imports/db/TasksStatus'

export function publishTasks({ showCompleted, filterName, skip, limit }) {
  const filter = {
    $or: [
      { private: false },
      { createdBy: this.userId }
    ]
  }

  if (!showCompleted) {
    filter.status = {
      $ne: Status.DONE
    }
  }

  if (filterName) {
    filter.name = new RegExp(filterName, 'i')
  }

  return Task.find(filter, {
    sort: { deadline: 1, createdAt: -1 },
    skip: (skip || 0),
    limit: (limit || 4)
  })
}