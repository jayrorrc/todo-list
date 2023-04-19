import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import { Accounts } from 'meteor/accounts-base'
import { User } from '/imports/db/UsersCollection'

export function recoverPassword(username) {
  check(username, String)

  const user = User.findOne({ username })

  if (!user) {
    throw new Meteor.Error("User don't found!")
  }

  Accounts.sendResetPasswordEmail(user._id)
}