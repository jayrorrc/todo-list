import React, { useState, useRef, useEffect, Fragment } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export const TaskListItemOptions = ({ actionEdit, actionRemove }) => {
  const ref = useRef(null)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (callback) => {
    return () => {
      setAnchorEl(null)

      if (callback) {
        callback()
      }
    }
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
        <MenuItem onClick={handleClose(actionEdit)}>Editar</MenuItem>
        <MenuItem onClick={handleClose(actionRemove)}>Remover</MenuItem>
      </Menu>
    </Fragment>
  )
}
