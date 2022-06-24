import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react'

export default function BasicMenu({ anchorEl, handleClose, open, menuItems }) {
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItems.map(item => {
          return <MenuItem onClick={handleClose}>{item}</MenuItem>
        })}
      </Menu>
    </div>
  );
}