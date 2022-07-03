import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box'

export default function BasicDialog({ action, children, buttonMsg, sx }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    action()
  }

  return (
    <Box
      sx={{
        marginTop: 'auto',
        width: '100%'
      }}
    >
      <Button variant="outlined" color="error" onClick={handleClickOpen}
        sx={sx}
      >
        {buttonMsg}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {children}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAction} autoFocus>
            {buttonMsg}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}