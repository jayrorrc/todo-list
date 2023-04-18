import { Task } from '/imports/db/TasksCollection'
import { Status } from '/imports/db/TasksStatus'

export function publishTasks({ hideCompleted }) {
  const filter = {
    $or: [
      { private: false },
      { createdBy: this.userId }
    ]
  }

  if (hideCompleted) {
    filter.status = {
      $ne: Status.DONE
    }
  }

  return Task.find(filter)
}