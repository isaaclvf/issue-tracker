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
        {menuItems.map((item, index) => {
          return <MenuItem key={index} onClick={handleClose}>{item}</MenuItem>
        })}
      </Menu>
    </div>
  );
}