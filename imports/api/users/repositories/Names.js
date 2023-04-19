import { User } from '/imports/db/UsersCollection'

export function publishUsersNames() {
  return User.find(
    {},
    {
      fields: {
        'username': 1,
        'profile.name': 1
      }
    })
}