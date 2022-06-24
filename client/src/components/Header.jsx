import React from 'react'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import NotificationBell from './NotificationBell'

const Header = ({ drawerWidth }) => {
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleOpen = (event) => {
    setOpen(true)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }

  return (
    <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Hello, %name%!
          </Typography>
          <Box>
            <NotificationBell 
              badgeContent={10}
              anchorEl={anchorEl}
              handleOpen={handleOpen}
              handleClose={handleClose}
              open={open}
            />
          </Box>
        </Toolbar>
      </AppBar>
  )
}

export default Header