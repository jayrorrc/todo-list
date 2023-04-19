import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import { Accounts } from 'meteor/accounts-base'
import { User, UserProfile } from '/imports/db/UsersCollection'
import { Genders } from '/imports/db/UsersGenders'

export function update(data) {
  check(data, {
    name: String,
    borthDate: Date,
    gender: Match.OneOf(...Genders.getValues()),
    company: String,
    photo: String
  })

  if (!this.userId) {
    throw new Meteor.Error('Not authorized.')
  }

  const user = User.findOnde({ _id: this.userId })

  if (!user) {
    throw new Meteor.Error('Something goes worng!!!')
  }

  const profile = new UserProfile()
  profile.name = data.name
  profile.borthDate = data.borthDate
  profile.gender = data.gender
  profile.company = data.company
  profile.photo = data.foto

  user.profile = profile
  user.save()
}