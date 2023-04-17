import React from 'react';
import { Meteor } from 'meteor/meteor';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Dashboard } from "./tasks/Dashboard"
import { TaskList } from "./tasks/TaskList"
import { Edit } from "./tasks/Edit"
import { SingIn } from "./auth/SingIn"
import { SingUp } from "./auth/SingUp"
import { RequireAuth } from "./auth/RequireAuth"
import { Bar } from "./nav/Bar"

import { AuthProvider } from "/imports/hooks/use-auth"

import Container from '@mui/material/Container';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const App = () => {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
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
                    <TaskList />
                  </RequireAuth>
                }
              />
              <Route
                exact
                path="task/:id/edit"
                element={
                  <RequireAuth>
                    <Edit />
                  </RequireAuth>
                }
              />
              <Route path="/singin" element={<SingIn />} />
              <Route path="/singup" element={<SingUp />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </LocalizationProvider>
    </AuthProvider>
  )
}
