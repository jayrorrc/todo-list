import React from 'react'

import { useAuth } from "/imports/hooks/use-auth"

import {
  useNavigate,
  Link as RouterLink
} from "react-router-dom"

import { PageLayout } from '../PageLayout'
import { UserForm } from '/imports/ui/users/UserForm'

import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

export const SingUp = () => {
  const navigate = useNavigate()
  const { signin } = useAuth()

  const singup = (data) => {
    const dataFormated = { ...data, birthdate: data.birthdate.toDate() }
    Meteor.call('users.singup', dataFormated, async () => {

      await signin(dataFormated.username, dataFormated.password)
      navigate("/")
    })
  }

  return (
    <PageLayout
      title="Novo cadastro"
    >
      <UserForm
        singup
        handleSubmit={singup}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
          }}
        >
          Cadastrar e logar
        </Button>
      </UserForm>

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
          Voltar
        </Link>
      </Box>
    </PageLayout>
  )
}
