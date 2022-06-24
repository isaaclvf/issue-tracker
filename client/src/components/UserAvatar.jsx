import React from 'react'
import { lightGreen } from '@mui/material/colors'
import { Avatar } from '@mui/material'

const UserAvatar = () => {
  return (
      <Avatar
        sx={{ 
          width: 32, 
          height: 32, 
          bgcolor: lightGreen[500],
        }}
      >
        U
      </Avatar>
  )
}

export default UserAvatar