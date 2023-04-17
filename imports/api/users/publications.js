import { Meteor } from 'meteor/meteor'

Meteor.publish('users.names', function publishUsers() {
  return Meteor.users.find(
    {},
    {
      fields: { 'username': 1 },
      sort: { createdAt: -1 },
    })
});