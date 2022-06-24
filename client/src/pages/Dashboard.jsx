import React from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Header from '../components/Header';

const drawerWidth = 240;

const Dashboard = () => {
  return (
    <CssBaseline>
      <Header drawerWidth={drawerWidth}/>
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