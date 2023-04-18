import { Task } from '/imports/db/TasksCollection'

export function publishTask({ id }) {
  return Task.find({_id: id})
}