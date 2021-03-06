import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deletePost } from '../../service/api';
import Grow from '@mui/material/Grow';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
  });

export default function DeleteDialog(props) {
    const history = useHistory();

    const deletePostHandle = async () => {
        try {
            await deletePost(props.id);
            props.setOpen(false);
            toast.success('Post deleted')
            props.setToggle(prev => !prev);
                history.push('/')
        } catch (error) {
            toast.error('Something went wrong')
        }
      }

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle sx={{backgroundColor: '#1E1E1E'}}>
                    Delete Post
                </DialogTitle>
                <DialogContent sx={{backgroundColor: '#1E1E1E'}}>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{backgroundColor: '#1E1E1E'}}>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={deletePostHandle} color='error'>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
