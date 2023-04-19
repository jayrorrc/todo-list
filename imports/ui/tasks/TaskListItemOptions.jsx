import React, { useState, useRef, useEffect, Fragment } from 'react'

import { useNavigate } from "react-router-dom"

import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export const TaskListItemOptions = ({ id }) => {
  const navigate = useNavigate()

  const ref = useRef(null)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    handleClose()
    navigate(`/task/${id}/edit`)
  }

  const handleDelete = () => {
    Meteor.call('tasks.delete', id, () => {
      handleClose()
    })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setAnchorEl(null)
      }
    }

    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <Fragment>
      <IconButton
        ref={ref}
        edge="end"
        aria-label="more actions"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Remover</MenuItem>
      </Menu>
    </Fragment>
  )
}
