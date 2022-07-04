import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Header from '../components/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Media from 'react-media';
import apiService from '../services/apiService';
import Projects from './Projects';

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect if user is not logged in
  const token = localStorage.getItem('token')

  const checkAuth = async () => {
    const isAuth = await apiService.isAuth()
    if (!isAuth) {
      localStorage.clear()
      return navigate('/login')
    }
    return
  }

  useEffect(() => {
    if (!token) {
      return navigate('/login')
    }

    if (token) {
      checkAuth()
    }
  }, [])

  const username = localStorage.getItem('name')

  return (
    <CssBaseline>
      <Media queries={{
          small: "(max-width: 599px)",
          medium: "(min-width: 600px) and (max-width: 1199px)",
          large: "(min-width: 1200px)"
      }}>
        {matches => (
          <>
            {matches.small && <Header drawerWidth={0} tmpbar={true} username={username} />} 
            {matches.medium && <Header drawerWidth={drawerWidth} username={username} />} 
            {matches.large && <Header drawerWidth={drawerWidth} username={username} />} 
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
          {
            location.pathname === '/dashboard/' || location.pathname === '/dashboard'
            ? <Projects />
            : <Outlet />
          }
        </Box>  
      </Box>
    </CssBaseline>
  )
}

export default Dashboard