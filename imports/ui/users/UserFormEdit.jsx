import React from 'react'

import { useAuth } from "/imports/hooks/use-auth"

import { PageLayout } from '../PageLayout'
import { UserForm } from './UserForm'

import Button from '@mui/material/Button'

export const UserFormEdit = () => {
  const { currentUser } = useAuth()

  const userUpdate = (data) => {
    const dataFormated = { ...data, birthdate: data.birthdate.toDate() }
    Meteor.call('users.update', dataFormated)
  }

  return (
    <PageLayout
      title="Meus dados"
    >
      <UserForm
        user={currentUser}
        handleSubmit={userUpdate}
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
          Atualizar dados
        </Button>
      </UserForm>
    </PageLayout>
  )
}
