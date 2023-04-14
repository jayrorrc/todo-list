import React from 'react';
import { Meteor } from 'meteor/meteor';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Dashboard } from "./tasks/Dashboard"
import { List } from "./tasks/List"
import { SingIn } from "./auth/SingIn"
import { SingUp } from "./auth/SingUp"
import { RequireAuth } from "./auth/RequireAuth"
import { Bar } from "./nav/Bar"

import { AuthProvider } from "/imports/hooks/use-auth"

import Container from '@mui/material/Container';

export const App = () => {
  return (
    <AuthProvider>
      <Container component="main" maxWidth="xs">
        <Bar />

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
      </Container>
    </AuthProvider>
  )
}
