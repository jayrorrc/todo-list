import React, { Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Dashboard } from "./tasks/Dashboard"
import { List } from "./tasks/List"
import { SingIn } from "./Auth/SingIn"
import { SingUp } from "./Auth/SingUp"
import { RequireAuth } from "./Auth/RequireAuth"


export const App = () => {
  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();

  return (
    <Fragment>
      {
        user && <div className="user" onClick={logout}>
          { user.username } 🚪
        </div>
      }

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/tasks"
            element={
              <RequireAuth>
                <List />
              </RequireAuth>
            }
          />
          <Route path="/singin" element={<SingIn />} />
          <Route path="/singup" element={<SingUp />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}
