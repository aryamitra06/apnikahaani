import React, { useState, useEffect } from 'react'
import { newComment } from '../service/api';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'

function Addcomment(props) {
    let history = useHistory();

    const initialValue = {
        email: '',
        profilephoto: '',
        postId: '',
        date: new Date(),
        comment: ''
    }
    const [comment, setComment] = useState(initialValue);

    const handleChange = (e) => {
        setComment({
            ...comment,
            email: localStorage.getItem('email'),
            postId: props.id,
            comment: e.target.value,
            profilephoto: localStorage.getItem('profilepic')
        })
    }
    
    
    const postComment = async () => {
        await newComment(comment);
        props.setToggle(prev => !prev);
    }
    
    return (
        <>
            <Stack direction="row" spacing={1}>
                <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Avatar" src={localStorage.getItem('profilepic')} />
                </IconButton>
                <TextField name="comment" type="text" label="Comment..." size="small" onChange={(e) => handleChange(e)} />
                <Button variant="outlined" size="medium" onClick={() => postComment()} disabled={comment.comment.length === 0}>Post</Button>
            </Stack>
        </>
    )
}


export default Addcomment