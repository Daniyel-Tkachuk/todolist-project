import * as React from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const ErrorSnackbar = () => {

   const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
   ) => {
      if (reason === 'clickaway') {
         return;
      }
   };

   return (
      <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
         <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{width: '100%'}}
         >
            This is a success Alert inside a Snackbar!
         </Alert>
      </Snackbar>
   );
}