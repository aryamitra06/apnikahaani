import React, { useState } from 'react'
import { deleteComment } from '../../service/api';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardHeader from "@mui/material/CardHeader";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import toast from 'react-hot-toast';

function Comment(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteCommentHandle = async () => {
        try {
            await deleteComment(props.id);
            setAnchorEl(null);
            toast.success('Comment deleted')
            props.setToggle(prev => !prev);
        } catch (error) {
            toast.error('Something went wrong')
        }

    }


    return (
        <>
            <Card sx={{ width: '97%', marginBottom: 2 }}>
                <CardHeader
                    avatar={<Avatar src={props.profilephoto} />}
                    action={
                        <IconButton onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.email}
                    subheader={new Date(props.date).toDateString()}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.comment}
                    </Typography>
                </CardContent>
            </Card>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={deleteCommentHandle}>Delete</MenuItem>
            </Menu>
        </>
    )
}

export default Comment