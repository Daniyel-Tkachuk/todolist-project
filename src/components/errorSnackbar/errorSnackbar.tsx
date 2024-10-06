import * as React from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../state/store";
import {setErrorAC} from "../../state/reducers/app-reducer";

export const ErrorSnackbar = () => {
   const error = useAppSelector<null | string>(state => state.app.error);
   const dispatch = useAppDispatch();

   const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
   ) => {
      if (reason === 'clickaway') {
         return;
      }

      dispatch(setErrorAC(null))
   };

   return (
      <Snackbar open={!!error}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
      >
         <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{width: '100%'}}
         >
            {error}
         </Alert>
      </Snackbar>
   );
}