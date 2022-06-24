import React from 'react'
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import navbarItems from './navbarItems';
import Box from '@mui/material/Box'
import logo from '../assets/logo192.png'

const drawerWidth = 240;

const Navbar = () => {
  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Link
          sx={{
            display: 'flex',
            justifyContent: 'left',
            padding: '1rem',
            textDecoration: 'none',
            color: 'black'
          }}
          href='/dashboard'
        >
          <Box
              component="img"
              alt=''
              src={logo}
              sx={{
                height: '60px',
                width: '60px',
                marginRight: '1rem',
              }}
            />
          <Typography
          >
            Issue <br/>
            Tracker
          </Typography>
        </Link>
        <Divider />
        <List>
          {navbarItems.map(item => (
            <ListItem key={item.id} disablePadding>
              <Link
                sx={{
                  textDecoration: 'none',
                  color: 'black'
                }}
                href={item.link}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{marginLeft: '-25px'}}/>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      
  )
}

export default Navbar