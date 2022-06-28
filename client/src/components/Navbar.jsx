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
import LogoutDialog from './LogoutDialog';

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
          display: 'flex',
          flexDirection: 'column',
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

          <Typography
            variant='h5'
          >
            Issue Tracker
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
                <ListItemButton sx={{ width: '239px', padding: 'auto' }}>
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
        <LogoutDialog/>
      </Drawer>
  )
}

export default Navbar