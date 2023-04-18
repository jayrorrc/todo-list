import React from 'react';

import { useAuth } from "/imports/hooks/use-auth"

import { useNavigate } from "react-router-dom";

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export const Menu = () => {
  const navigate = useNavigate();

  const { currentUser, singout } = useAuth()

  if (!sessionStorage.getItem('authed')) {
    singout()
  }

  const getAvatar = () => {
    if (currentUser?.photo) {
      return (
        <Avatar
          sx={{
            width: 30,
            height: 30
          }}
          src={currentUser.photo}
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

  const goHome = () => {
    navigate('/')
  }

  const goList = () => {
    navigate('/tasks')
  }

  const goAccount = () => {
    navigate('/account')
  }

  if (currentUser) {
    return (
      <Drawer
        anchor={'left'}
        variant="permanent"
      >
        <Toolbar>
          <List>
            <ListItem disablePadding>
              <ListItemAvatar>
                {getAvatar()}
              </ListItemAvatar>
              <ListItemText
                primary={currentUser?.name || currentUser?.username}
                secondary={currentUser?.email}
              />
            </ListItem>
          </List>
        </Toolbar>
        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={goHome}
            >
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={goList}
            >
              <ListItemText primary="Lista de tarefas" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={goAccount}
            >
              <ListItemText primary="Minha conta" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    )
  }
}
