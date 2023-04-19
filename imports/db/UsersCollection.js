import { Class } from 'meteor/jagi:astronomy'

import { Genders } from './UsersGenders'

const UserProfile = Class.create({
  name: 'UserProfile',
  fields: {
    name: String,
    borthDate: Date,
    gender: Genders,
    company: String,
    photo: String
  }
});

const User = Class.create({
  name: 'User',
  collection: Meteor.users,
  fields: {
    username: String,
    createdAt: Date,
    emails: {
      type: [Object],
      default: function() {
        return [];
      }
    },
    profile: {
      type: UserProfile,
      default: function() {
        return {};
      }
    }
  }
});

if (Meteor.isServer) {
  User.extend({
    fields: {
      services: Object
    }
  });
}

export { User, UserProfile }