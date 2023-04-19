import { Meteor } from 'meteor/meteor'
import { publishUsersNames } from './repositories/Names'

Meteor.publish('users.names', publishUsersNames)