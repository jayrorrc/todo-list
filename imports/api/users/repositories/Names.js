import { Meteor } from 'meteor/meteor'

export function publishUsers() {
  return Meteor.users.find(
    {},
    {
      fields: { 'username': 1 },
      sort: { createdAt: -1 },
    })
}