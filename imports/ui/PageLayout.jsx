import React, { Fragment } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { Menu } from "./nav/Menu"


export const PageLayout = ({ title, loading, titleComponent, children }) => {
  return (
    <Fragment>
      <Menu />

      {
        titleComponent
        || (
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: 'center', m: 1 }}
          >
            {title}
          </Typography>
        )
      }

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
          )
          : children
      }
    </Fragment>
  )
}
