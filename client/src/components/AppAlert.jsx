import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AppAlert(props) {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    return (
        <>
            <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
                <Alert onClose={props.handleClose} severity= {props.type} sx={{ width: '100%' }}>
                    {props.msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AppAlert