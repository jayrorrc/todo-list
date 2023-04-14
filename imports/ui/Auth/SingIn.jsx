import React, { useState, Fragment } from 'react';

import {
  useNavigate,
  useLocation,
  Link as RouterLink
} from "react-router-dom";

import { useAuth } from "/imports/hooks/use-auth"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export const SingIn = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const { signin } = useAuth();

  const submit = async (e) => {
    e.preventDefault();

    await signin(username, password)
    navigate(state?.path || "/")
  };

  return (
    <Fragment>
      <Box
        component="form"
        onSubmit={submit}
        sx={{
          p: 3,
          borderRadius: 1,
          boxShadow: 2
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: 'center', m: 1 }}
        >
          Bem vindo ao To Do List!
        </Typography>

        <TextField
          id="username"
          label="Username"
          required
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
          sx={{ my: 2 }}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          required
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ my: 2 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: '#333232',
            "&:hover": {
              bgcolor: "#191919",
            },
          }}
        >
          Sign In
        </Button>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          my: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Link
          component={RouterLink}
          to="/singup"
          underline="hover"
          sx={{
            color: '#333232',
            m: 1,
          }}
        >
          Cadastrar
        </Link>

        <Link
          component={RouterLink}
          to="#"
          underline="hover"
          sx={{
            color: '#333232',
            m: 1,
          }}
        >
          Recuperar senha
        </Link>
      </Box>
    </Fragment>
  );
};