import { Meteor } from 'meteor/meteor'
import { publishUsers } from './repositories/Names'

Meteor.publish('users.names', publishUsers);