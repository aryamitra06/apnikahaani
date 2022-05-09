import React, { useState } from 'react'
import { newComment } from '../service/api';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';


function Addcomment(props) {

    const [state,setState] = useState({comment: ''});
    const [loading, setloading] = useState(false);



    const clearField = () => {
        setState({ ...{comment: ''} });
      };
    
    const onChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
      };
    
      const handleSubmit =  async (e) => {
        e.preventDefault();
        setloading(true)
        try {
          await newComment({email: localStorage.getItem('email'), postId: props.id, date: new Date(), comment: state.comment, profilephoto: localStorage.getItem('profilepic')});
          props.setToggle(prev => !prev);
          setTimeout(() => {
            clearField();
            setloading(false)
          }, 1000);
        } catch (error) {
          setTimeout(() => {
            clearField();
            setloading(false)
          }, 1000);
        }
      };

    
    return (
        <>
        {
          (localStorage.getItem('token')) ? (
            <>
        <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1}>
                <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Avatar" src={localStorage.getItem('profilepic')} />
                </IconButton>
                <TextField  fullWidth type="text" label="Comment..." size="small" name="comment" value={state.comment} onChange={onChange} />
                <LoadingButton type='submit' variant="outlined" size="medium" disabled={state.comment.length===0} loading={loading}>Post</LoadingButton>
            </Stack>
        </form>
            </>
          ): (
            <>
            </>
          )
        }
        </>
    )
}


export default Addcomment