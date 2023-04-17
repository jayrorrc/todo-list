import React from 'react'
import { useParams } from "react-router";

import { Form } from './Form'
import { PageLayout } from '../PageLayout'

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button'

export const Edit = ({handleCancel}) => {
  const { id } = useParams();

   const submit = async (e) => {
    e.preventDefault()

    console.log('oi')
   }

  return (
    <PageLayout
      title={`Editar tarefa: ${id}`}
    >
      <Form
        handleSubmit={submit}
      >
        <ButtonGroup
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
          }}
        >
          <Button>
            Cancelar
          </Button>

          <Button
            type="submit"
          >
            Salvar
          </Button>
        </ButtonGroup>
      </Form>
    </PageLayout>
  )
}
