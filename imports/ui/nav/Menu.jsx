import React from 'react'

import { useAuth } from "/imports/hooks/use-auth"

import { useNavigate } from "react-router-dom"

import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import PersonIcon from '@mui/icons-material/Person'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'

export const Menu = ({ drawerWidth, handleUpdateHasDrawer }) => {
  const navigate = useNavigate()

  const { currentUser, singout } = useAuth()

  if (!sessionStorage.getItem('authed')) {
    singout()
  }

  if (currentUser) {
    handleUpdateHasDrawer(true)
  } else {
    handleUpdateHasDrawer(false)
  }

  const getAvatar = () => {
    if (currentUser?.profile?.photo) {
      return (
        <Avatar
          sx={{
            width: 30,
            height: 30
          }}
          src={currentUser.profile.photo}
        />
      )
    }

    return (
      <Avatar
        sx={{
          width: 30,
          height: 30
        }}
      >
        <PersonIcon />
      </Avatar>
    )
  }

  const items = [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'Lista de tarefas',
      url: '/tasks'
    },
    {
      label: 'Minha conta',
      url: '/account'
    },
  ]

  const goTo = ({ url }) => {
    navigate(url)
  }

  const username = currentUser?.profile?.name || currentUser?.username
  const getUserEmail = () => {
    if (!currentUser) {
      return
    }

    if (!currentUser.emails) {
      return
    }

    if (!currentUser.emails[0]) {
      return
    }

    return currentUser.emails[0].address
  }

  if (currentUser) {
    return (
      <Drawer
        anchor={'left'}
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar>
          <List>
            <ListItem disablePadding>
              <ListItemAvatar>
                {getAvatar()}
              </ListItemAvatar>
              <ListItemText
                primary={username}
                secondary={getUserEmail()}
              />
            </ListItem>
          </List>
        </Toolbar>
        <Divider />

        <List>
          {
            items.map((item, i) => (
              <ListItem
                key={i}
                disablePadding
              >
                <ListItemButton
                  onClick={() => goTo(item)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))
          }

          <ListItem
            disablePadding
          >
            <ListItemButton
              onClick={() => singout()}
            >
              <ListItemText primary='Sair' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    )
  }
}
