import { Meteor } from 'meteor/meteor'

import { singup } from './repositories/SingUp'
import { update } from './repositories/Update'

Meteor.methods({
  'users.singup': singup,
  'users.update': update,
})