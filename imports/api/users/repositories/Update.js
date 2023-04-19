import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import { User, UserProfile } from '/imports/db/UsersCollection'
import { Genders } from '/imports/db/UsersGenders'

export function update(data) {
  check(data, {
    name: String,
    birthdate: Date,
    gender: Match.OneOf(...Genders.getValues()),
    company: String,
    photo: String
  })

  if (!this.userId) {
    throw new Meteor.Error('Not authorized.')
  }

  const user = User.findOne({ _id: this.userId })

  if (!user) {
    throw new Meteor.Error('Something goes worng!!!')
  }

  const profile = new UserProfile()
  profile.name = data.name
  profile.birthdate = data.birthdate
  profile.gender = data.gender
  profile.company = data.company
  profile.photo = data.photo

  user.profile = profile

  user.save()
}