import { Meteor } from 'meteor/meteor'

import { singup } from './repositories/SingUp'
import { update } from './repositories/Update'
import { recoverPassword } from './repositories/RecoverPassword'

Meteor.methods({
  'users.singup': singup,
  'users.update': update,
  'users.recoverPassword': recoverPassword,
})