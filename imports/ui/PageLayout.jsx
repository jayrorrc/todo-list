import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import { Menu } from "./nav/Menu"

const DEFAULT_DRAWER_WIDTH = 240

export const PageLayout = ({ title, loading, titleComponent, children }) => {

  const [ drawerWidth, setDrawerWidth ] = useState(0)
  const [ hasDrawer, setHasDrawer ] = useState(false)

  useEffect(() => {
    if (hasDrawer) {
      setDrawerWidth(DEFAULT_DRAWER_WIDTH)
    } else {
      setDrawerWidth(0)
    }
  }, [hasDrawer]);

  const updateHasDrawer = (val) => {
    setHasDrawer(val)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        color=''
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
        </Toolbar>
      </AppBar>

      <Menu
        drawerWidth={drawerWidth}
        handleUpdateHasDrawer={updateHasDrawer}
      />

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          flexGrow: 1,
          p: 3
        }}
      >
        <Toolbar />
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
      </Container>
    </Box>
  )
}
