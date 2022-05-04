import React, { useState, useEffect } from 'react'
import { newComment } from '../service/api';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'

const initialState = {
    email: '',
    profilephoto: '',
    postId: '',
    date: new Date(),
    comment: ''
}
function Addcomment(props) {
    // const [comment, setComment] = useState(initialValue);

    // const handleChange = (e) => {
    //     setComment({
    //         ...comment,
    //         email: localStorage.getItem('email'),
    //         postId: props.id,
    //         comment: e.target.value,
    //         profilephoto: localStorage.getItem('profilepic')
    //     })
    // }
    
    
    // const postComment = async () => {
    //     await newComment(comment);
    //     props.setToggle(prev => !prev);
    // }

    const [{ email, profilephoto, postId, date, comment },setState] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState });
      };
    
    const onChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
      };
    
      const handleSubmit =  async (e) => {
        e.preventDefault();
        await newComment({email: localStorage.getItem('email'), postId: props.id, date: new Date(), comment: comment, profilephoto: localStorage.getItem('profilepic')});
        props.setToggle(prev => !prev);

        console.log(comment);
        setTimeout(() => {
          clearState();
        }, 1000);
      };

    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1}>
                <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Avatar" src={localStorage.getItem('profilepic')} />
                </IconButton>
                <TextField type="text" label="Comment..." size="small" value={comment} name="comment" onChange={onChange} />
                <Button type='submit' variant="outlined" size="medium">Post</Button>
            </Stack>
        </form>
        </>
    )
}


export default Addcomment