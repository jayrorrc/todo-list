import React, { useState, useContext, createContext } from "react"
import { Accounts } from 'meteor/accounts-base'

import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'

const authContext = createContext()


function useProvideAuth() {
  const currentUser = useTracker(() => Meteor.user())
  const [ authed, setAuthed ] = useState(false)

  return {
    currentUser,
    authed,

    resetPassword(token, password) {
      return new Promise((resolve, reject) => {
        Accounts.resetPassword(token, password, (error) => {
          if (error) {
            console.error(error)

            reject()
          }

          setAuthed(true)
          sessionStorage.setItem('authed', true)

          resolve()
        })
      })
    },

    signin(username, password) {
      return new Promise((resolve, reject) => {
        Meteor.loginWithPassword(username, password, (error) => {
          if (error) {
            return reject(error)
          }

          setAuthed(true)
          sessionStorage.setItem('authed', true)

          return resolve()
        })
      })
    },

    singout() {
      return new Promise((resolve) => {
        Meteor.logout((error) => {
          if (error) {
            return reject(error)
          }

          setAuthed(false)
          sessionStorage.setItem('authed', false)

          return resolve()
        })
      })
    },
  }
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}
