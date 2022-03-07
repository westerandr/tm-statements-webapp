import { useState } from 'react';
import { Snackbar as Sb, Alert, AlertColor } from '@mui/material';

type SnackbarProps = {
  openProp: boolean;
  message: string;
  onClose: () => void;
  variant: AlertColor;
};


export default function Snackbar({ openProp, message, variant, onClose} : SnackbarProps){
  const [open, setOpen] = useState(openProp);

  return (
      <Sb
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={6000}        
      >
        <Alert onClose={onClose} severity={variant} sx={{width: '100%'}}>
          {message}
        </Alert>
      </Sb>
      );
}