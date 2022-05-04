import React, { useState, useEffect } from 'react'
import { newComment } from '../service/api';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'


function Addcomment(props) {

    const [state,setState] = useState({comment: ''});

    const clearField = () => {
        setState({ ...{comment: ''} });
      };
    
    const onChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
      };
    
      const handleSubmit =  async (e) => {
        e.preventDefault();
        await newComment({email: localStorage.getItem('email'), postId: props.id, date: new Date(), comment: state.comment, profilephoto: localStorage.getItem('profilepic')});
        props.setToggle(prev => !prev);

        setTimeout(() => {
          clearField();
        }, 1000);
      };

    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1}>
                <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Avatar" src={localStorage.getItem('profilepic')} />
                </IconButton>
                <TextField type="text" label="Comment..." size="small" name="comment" value={state.comment} onChange={onChange} />
                <Button type='submit' variant="outlined" size="medium">Post</Button>
            </Stack>
        </form>
        </>
    )
}


export default Addcomment