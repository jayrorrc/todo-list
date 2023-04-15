import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';

import { useAuth } from "/imports/hooks/use-auth"

import { Link as RouterLink } from "react-router-dom";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { DashboardCard } from './DashboardCard';

export const Dashboard = () => {
  const { currentUser } = useAuth()

  const getTitile = () =>
    `Olá ${currentUser.username}, seja bem vindo ao To Do List!`

  const [ loading, setLoading ] = useState(false)
  const [ cards, setCards ] = useState([
    {
      title: 'Total de tarefas cadastradas',
      value: '0',
      key: 1
    },
    {
      title: 'Total de tarefas concluidas',
      value: '0',
      key: 2
    },
    {
      title: 'Total de tarefas a serem concluidas',
      value: '0',
      key: 3
    },
  ])

  Meteor.call('tasks.summary', (error, result) => {
    setLoading(true)

    if (error) {
      console.error(error)

      setLoading(false)

      return
    }

    const [ summary ] = result
    const { toDo, inProgress, done } = summary

    setCards([
      {
        title: 'Total de tarefas cadastradas',
        value: toDo,
        key: 1
      },
      {
        title: 'Total de tarefas concluidas',
        value: inProgress,
        key: 2
      },
      {
        title: 'Total de tarefas a serem concluidas',
        value: done,
        key: 3
      },
    ])

    setLoading(false)
  })

  return (
    <Fragment>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textAlign: 'center', m: 1 }}
      >
        {getTitile()}
      </Typography>

      {
        loading
          ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress color="inherit" />
            </Box>
          ) : (
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
          )
      }

    </Fragment>
  )
}
