import React from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Header from '../components/Header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Media from 'react-media';

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate()

  // Redirect if user is not logged in
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (!token) {
      return navigate('/login')
    }
  }, [])

  return (
    <CssBaseline>
      <Media queries={{
          small: "(max-width: 599px)",
          medium: "(min-width: 600px) and (max-width: 1199px)",
          large: "(min-width: 1200px)"
      }}>
        {matches => (
          <>
            {matches.small && <Header drawerWidth={0} tmpbar={true}/>} 
            {matches.medium && <Header drawerWidth={drawerWidth}/>} 
            {matches.large && <Header drawerWidth={drawerWidth}/>} 
          </>
        )}
      </Media>
      <Box sx={{ display: 'flex' }}>
      <Media queries={{
          small: "(max-width: 599px)",
          medium: "(min-width: 600px) and (max-width: 1199px)",
          large: "(min-width: 1200px)"
      }}>
        {matches => (
          <>
            {matches.medium && <Navbar />} 
            {matches.large && <Navbar />} 
          </>
        )}
      </Media>
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