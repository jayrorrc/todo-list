import { Meteor } from 'meteor/meteor'
import React, { useState, Fragment } from 'react'

import { useAuth } from "/imports/hooks/use-auth"

import { Link as RouterLink } from "react-router-dom"

import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

import { DashboardCard } from './DashboardCard'
import { PageLayout } from '../PageLayout'

export const Dashboard = () => {
  const { currentUser } = useAuth()

  const getTitile = () =>
    `Olá ${currentUser?.username}, seja bem vindo ao To Do List!`

  const getCardsData = ({ toDo, inProgress, done }) => [
    {
      title: 'Total de tarefas cadastradas',
      value: toDo ? toDo : '0',
      key: 1
    },
    {
      title: 'Total de tarefas concluidas',
      value: inProgress ? inProgress : '0',
      key: 2
    },
    {
      title: 'Total de tarefas a serem concluidas',
      value: done ? done : '0',
      key: 3
    },
  ]

  const [ loading, setLoading ] = useState(true)
  const [ cards, setCards ] = useState(getCardsData({}))

  Meteor.call('tasks.summary', (error, result) => {
    setLoading(true)

    if (error) {
      console.error(error)

      setLoading(false)

      return
    }

    const [ summary ] = result
    setCards(getCardsData(summary ? summary : {}))

    setLoading(false)
  })

  return (
    <PageLayout
      title={ getTitile() }
      loading={ loading }
    >
      <Grid container spacing={2}>
        { cards.map(card => DashboardCard(card))}

        <DashboardCard>
          <Link
            component={RouterLink}
            to="/tasks"
            underline="hover"
            sx={{
              color: '#333232',
              m: 1,
              fontSize: 30,
              textAlign: 'center',
            }}
          >
            Visualizar Tarefas
          </Link>
        </DashboardCard>
      </Grid>
    </PageLayout>
  )
}
