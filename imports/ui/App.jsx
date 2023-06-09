import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import { Dashboard } from "./tasks/Dashboard"
import { TaskListPage } from "./tasks/TaskListPage"
import { TaskComponent } from "./tasks/TaskComponent"
import { SingIn } from "./auth/SingIn"
import { SingUp } from "./auth/SingUp"
import { RequireAuth } from "./auth/RequireAuth"
import { RecoverPassword } from "./auth/RecoverPassword"
import { UserFormEdit } from "./users/UserFormEdit"

import { AuthProvider } from "/imports/hooks/use-auth"

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const App = () => {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'br'}>
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
                  <TaskListPage />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="task/:id/edit"
              element={
                <RequireAuth>
                  <TaskComponent />
                </RequireAuth>
              }
            />

            <Route
              path="/account"
              element={
                <RequireAuth>
                  <UserFormEdit />
                </RequireAuth>
              }
            />
            <Route path="/singin" element={<SingIn />} />
            <Route path="/singup" element={<SingUp />} />
            <Route path="/reset-password/:token" element={<RecoverPassword />} />

          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </AuthProvider>
  )
}
