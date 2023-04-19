import { Meteor } from 'meteor/meteor'

import { publishTasks } from './repositories/Tasks'
import { publishTask } from './repositories/Task'

Meteor.publish('tasks', publishTasks)
Meteor.publish('task', publishTask)