import React, { useState } from 'react'

import {
  useNavigate,
  Link as RouterLink
} from "react-router-dom"

import { useParams } from "react-router"

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

import { PageLayout } from '../PageLayout'

import { useAuth } from "/imports/hooks/use-auth"

export const RecoverPassword = () => {
  const navigate = useNavigate()

  const [ password, setPassword ] = useState('')
  const { token } = useParams()
  const { resetPassword } = useAuth()

  const submit = async (e) => {
    e.preventDefault()

    await resetPassword(token, password)

    navigate('/')
  }

  return (
    <PageLayout
      title="Digite uma nova senha"
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
          Resetar senha
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
          to="/singin"
          underline="hover"
          sx={{
            color: '#333232',
            m: 1,
          }}
        >
          Sing In
        </Link>

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
      </Box>
    </PageLayout>
  )
}