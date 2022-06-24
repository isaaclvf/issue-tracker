import React from 'react'
import { lightGreen } from '@mui/material/colors'
import { Button, Avatar, Box } from '@mui/material'

const UserAvatar = ({ children }) => {
  return (
    <Box>
      <Button>
        <Avatar
          sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: lightGreen[500],
          }}
        >
          { children }
        </Avatar>
      </Button>
    </Box>
  )
}

export default UserAvatar