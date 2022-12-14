import React, { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export interface State extends SnackbarOrigin {
  open: boolean;
}

interface CustomSnackbarProps {
    open: boolean;
    vertical: 'top' | 'bottom';
    horizontal: "center" | "left" | "right";
    message: string | null;
    severity: "error" | "warning" | "info" | "success";
    setOpen: (val: boolean) => void;
}

export default function CustomSnackbar({open, vertical, horizontal, message, severity, setOpen}: CustomSnackbarProps) {
  const handleClose = () => {
    setOpen(false)
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}