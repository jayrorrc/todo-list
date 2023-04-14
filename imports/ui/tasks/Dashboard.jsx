import React, { Fragment } from 'react';

import { useAuth } from "/imports/hooks/use-auth"

import {
  Link as RouterLink
} from "react-router-dom";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { DashboardCard } from './DashboardCard';


export const Dashboard = () => {
  const { currentUser } = useAuth()

  const getTitile = () =>
    `Olá ${currentUser.username}, seja bem vindo ao To Do List!`

  const cards = [
    {
      title: 'Total de tarefas cadastradas',
      value: '50',
      key: 1
    },
    {
      title: 'Total de tarefas concluidas',
      value: '15',
      key: 2
    },
    {
      title: 'Total de tarefas a serem concluidas',
      value: '3',
      key: 3
    },
  ]

  return (
    <Fragment>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textAlign: 'center', m: 1 }}
      >
        {getTitile()}
      </Typography>

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
    </Fragment>
  )
}
