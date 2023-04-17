import React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

export const DashboardCard = ({ title, value, key, children }) => {
  return (
    <Grid item xs={6} key={key}>
      <Card
        sx={{
          minHeight: 160,
          bgcolor: 'info.main',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#d1e5f9'
        }}
      >
        {
          title
          && (
            <Typography
              component="h5"
              sx={{ textAlign: 'center', m: 1 }}
            >
              {title}
            </Typography>
          )
        }

        { children }

        {
          value
          && (
            <Typography
              component="p"
              sx={{
                textAlign: 'center',
                m: 1,
                fontSize: 50
              }}
            >
              {value}
            </Typography>
          )
        }
      </Card>
    </Grid>
  )
}
