import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const WelcomeAlert = () => {
  return (
    <Alert severity="info" sx={{ mb: 1 }} >
      <AlertTitle>Thanks for checking out this demo project!</AlertTitle>
      Use 
      username: <strong>demouser</strong> {" / "}
      password: <strong>demo1234</strong>
    </Alert>
  )
}

export default WelcomeAlert