import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import navbarItems from './constants/navbarItems';
import { Typography } from '@mui/material';
import BasicDialog from './BasicDialog';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

export default function TempNavbar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate()
  
  const logout = () => {
    apiService.logout()
    navigate('/login')
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
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
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button 
            variant='outlined' 
            onClick={toggleDrawer(anchor, true)}
            sx={{color: 'white', marginLeft: '0'}}
          >
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
