import React, { useState } from 'react'

import {
  useNavigate,
  useLocation,
  Link as RouterLink
} from "react-router-dom"

import { useAuth } from "/imports/hooks/use-auth"

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert';

import { PageLayout } from '../PageLayout'

export const SingIn = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ usernameError, setUsernameError ] = useState(false)
  const [ recoverEmailSent, setRecoverEmailSent ] = useState(false)

  const { signin } = useAuth()

  const submit = async (e) => {
    e.preventDefault()

    await signin(username, password)
    navigate(state?.path || "/")
  }

  const recoverPassword = () => {
    if (!username) {
      setUsernameError(true)

      return
    }

    setUsernameError(false)

    Meteor.call('users.recoverPassword', username, (error, result) => {
      if (error) {
        console.error(error)

        return
      }

      setRecoverEmailSent(true)
    })
  }

  return (
    <PageLayout
      title="Bem vindo ao To Do List!"
    >
      <Box
        component="form"
        onSubmit={submit}
        sx={{
          p: 3,
          borderRadius: 1,
          boxShadow: 2
        }}
      >
        {usernameError && (<Alert severity="error">Username required</Alert>)}
        {recoverEmailSent && (<Alert severity="info">Recover email sent</Alert>)}

        <TextField
          id="username"
          label="Username"
          required
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
          sx={{ my: 2 }}
        />


        <TextField
          id="password"
          label="Password"
          type="password"
          required
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ my: 2 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
          }}
        >
          Sign In
        </Button>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          my: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Link
          component={RouterLink}
          to="/singup"
          underline="hover"
          sx={{
            color: '#333232',
            m: 1,
          }}
        >
          Cadastrar
        </Link>

        <Link
          component={RouterLink}
          to="#"
          underline="hover"
          sx={{
            color: '#333232',
            m: 1,
          }}
          onClick={recoverPassword}
        >
          Recuperar senha
        </Link>
      </Box>
    </PageLayout>
  )
}