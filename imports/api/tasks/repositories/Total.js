import { Task } from '/imports/db/TasksCollection'
import { Status } from '/imports/db/TasksStatus'

export function total({ showCompleted, filterName }) {
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

  return Task.find(filter).count()
}