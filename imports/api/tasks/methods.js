import { Meteor } from 'meteor/meteor'

import { summary } from './repositories/Summary'
import { start } from './repositories/Start'
import { finish } from './repositories/Finish'
import { restart } from './repositories/Restart'
import { update } from './repositories/Update'
import { create } from './repositories/Create'
import { total } from './repositories/Total'

Meteor.methods({
  'tasks.summary': summary,
  'tasks.start': start,
  'tasks.finish': finish,
  'tasks.restart': restart,
  'tasks.update': update,
  'tasks.create': create,
  'tasks.total': total,
})