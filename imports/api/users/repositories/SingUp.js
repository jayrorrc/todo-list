import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import { Accounts } from 'meteor/accounts-base'
import { User, UserProfile } from '/imports/db/UsersCollection'
import { Genders } from '/imports/db/UsersGenders'

export function singup(data) {
  check(data, {
    name: String,
    borthDate: Date,
    gender: Match.OneOf(...Genders.getValues()),
    company: String,
    photo: String,
    password: String,
    username: String,
    email: String
  })

  Accounts.createUser({
    username: data.username,
    password: data.password,
    email: data.email,
    profile: {
      name: data.name,
      borthDate: data.borthDate,
      gender: data.gender,
      company: data.company,
      photo: data.photo,
    }
  })
}