import React, { useState, useEffect } from 'react'

import { Genders } from '/imports/db/UsersGenders'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import PersonIcon from '@mui/icons-material/Person'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs'

export const UserForm = ({ user, singup, handleSubmit, children }) => {
  const GENDERS = Genders.getValues().map(g => ({ value: g, label: g }))

  const [ name, setName ] = useState('')
  const [ birthdate, setBirthdate ] = useState(dayjs())
  const [ gender, setGender ] = useState('')
  const [ company, setCompany ] = useState('')
  const [ photo, setPhoto ] = useState('')

  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ photoError, setPhotoError ] = useState(false)

  useEffect(() => {
    if (!user) {
      return
    }

    const { profile } = user

    if (!profile) {
      return
    }

    setName(profile.name)
    setBirthdate(dayjs(profile.birthdate))
    setGender(profile.gender )
    setCompany(profile.company )
    setPhoto(profile.photo )
  }, [ user ])

  const submit = (e) => {
    e.preventDefault()

    if (!photo) {
      setPhotoError(true)
      return
    }

    if (handleSubmit) {
      let data = {
        name,
        birthdate,
        gender,
        company,
        photo
      }

      if (singup) {
        data = {
          ...data,
          username,
          email,
          password
        }
      }

      handleSubmit(data)
    }
  }

  const getAvatar = () => {
    if (photo) {
      return (
        <Avatar
          src={photo}
          sx={{
            width: 100,
            height: 100
          }}
        />
      )
    }

    return (
      <Avatar
        sx={{
            width: 100,
            height: 100
          }}
      >
        <PersonIcon />
      </Avatar>
    )
  }

  const uploadImage = (e) => {
    console.warn('start upload')

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      setPhoto(reader.result)
      setPhotoError(false)

      console.warn('finish upload')
    }
  }

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        p: 3,
        borderRadius: 1,
        boxShadow: 2
      }}
    >
      <Stack>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            m: 1
          }}
        >
          {getAvatar()}

          <Button variant="contained" component="label">
            Tocar Imagem
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={uploadImage}
            />
          </Button>
        </Stack>
        {photoError && (<Alert severity="error">Photo required</Alert>)}
      </Stack>

      {
        singup
        && (
          <Box>
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
              id="email"
              label="Email"
              type="email"
              required
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
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
          </Box>
        )
      }

      <TextField
        id="name"
        label="Nome"
        required
        fullWidth
        value={name}
        onChange={e => setName(e.target.value)}
        sx={{ my: 2 }}
      />

      <DatePicker
        id="birthdate"
        label="Data de nascimento"
        slotProps={{
          textField: {
            fullWidth: true
          }
        }}
        value={birthdate}
        onChange={val => setBirthdate(val)}
      />

      <TextField
        id="gender"
        label="Sexo"
        required
        fullWidth
        select
        value={gender}
        onChange={e => setGender(e.target.value)}
        sx={{ my: 2 }}
      >
        {GENDERS.map((option, i) => (
          <MenuItem key={i} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="company"
        label="Empresa"
        required
        fullWidth
        value={company}
        onChange={e => setCompany(e.target.value)}
        sx={{ my: 2 }}
      />

      {children}
    </Box>
  )
}
