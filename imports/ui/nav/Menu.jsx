import React from 'react'

import { useAuth } from "/imports/hooks/use-auth"

import { useNavigate } from "react-router-dom"

import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import HomeIcon from '@mui/icons-material/Home'
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

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

  const getItemIcon = ({icon}) => {
    let componet

    switch (icon) {
      case 'home':
        componet = (<HomeIcon />)
        break;
      case 'list':
        componet = (<ListAltIcon />)
        break;
      case 'user':
        componet = (<PersonIcon />)
        break;
    }

    return componet
  }

  const items = [
    {
      label: 'Home',
      url: '/',
      icon: 'home'
    },
    {
      label: 'Lista de tarefas',
      url: '/tasks',
      icon: 'list'
    },
    {
      label: 'Perfil',
      url: '/account',
      icon: 'user'
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
                  <ListItemIcon>
                    {getItemIcon(item)}
                  </ListItemIcon>
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
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Sair' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    )
  }
}
