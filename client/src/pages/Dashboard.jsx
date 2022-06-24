import React from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const Dashboard = () => {
  return (
    <CssBaseline>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Hello, %name%!
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          Hi
        </Box>  
      </Box>
    </CssBaseline>
  )
}

export default Dashboard