import React from 'react'
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import navbarItems from './constants/navbarItems';
import BasicDialog from './BasicDialog';
import { useNavigate } from 'react-router-dom'
import apiService from '../services/apiService';

const drawerWidth = 240;

const Navbar = () => {
  const navigate = useNavigate()

  const logout = () => {
    apiService.logout()
    navigate('/login')
  }

  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          display: 'flex',
          flexDirection: 'column',
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            padding: '1rem',
            textDecoration: 'none',
            color: 'black'
          }}
          href='/dashboard'
        >
          <Typography
            variant='h5'
          >
            Issue Tracker
          </Typography>
        </Box>
        <Divider />
        <List>
          {navbarItems.map(item => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton sx={{ width: '239px', padding: 'auto' }}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{marginLeft: '-25px'}}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <BasicDialog action={logout} buttonMsg='Logout'
          sx={{ width: '100%' }}
        >
          Are you sure you want to log out?
        </BasicDialog>
      </Drawer>
  )
}

export default Navbar