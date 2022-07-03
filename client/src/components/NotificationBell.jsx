import React from 'react'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BasicMenu from './BasicMenu';

const NotificationBell = ({ notifications, handleOpen, handleClose, anchorEl, open }) => {
  notifications = []
  const badgeContent = notifications.length

  const newNotifications = `You have ${badgeContent} new notifications`
  const noNotifications = 'No new notifications'

  return (
    <>
      <Tooltip
        title={badgeContent ? newNotifications : noNotifications}
      >
        <IconButton
          aria-label='notification'
          onClick={badgeContent ? handleOpen : null}
          anchorEl={anchorEl}
        >
          <Badge badgeContent={badgeContent} color="primary">
            <NotificationsIcon color="action" />
          </Badge>
        </IconButton>
      </Tooltip>
      <BasicMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        menuItems={notifications}
      />
    </>
  )
}

export default NotificationBell