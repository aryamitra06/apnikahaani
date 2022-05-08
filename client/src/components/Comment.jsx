import React from 'react'
import { deleteComment } from '../service/api';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Comment(props) {

    const deleteCommentHandle = async () => {
        await deleteComment(props.id);
        props.setToggle(prev => !prev);
    }


    return (
        <>
            <Card sx={{ display: 'flex', width: '97%', marginBottom: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Avatar sx={{ marginLeft: 2, height: '60px', width: '60px' }} alt="Avatar" src={props.profilephoto} />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ display: 'flex', width: '100%' }}>
                        <Grid container alignItems='center' sx={{ width: '100%' }}>
                            <Grid item sm={9} xs={9} md={12} lg={9} xl={9}>
                                <Typography variant="h6">
                                    {props.comment}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {props.email}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary">
                                {new Date(props.date).toDateString()}
                                </Typography>
                            </Grid>
                            {
                                (props.email === localStorage.getItem('email')) ? (
                                    <>
                                        <Grid item sm={3} xs={3} md={12} lg={3} xl={3}>
                                            <IconButton aria-label="delete" onClick={() => deleteCommentHandle()}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                            }
                        </Grid>
                    </CardContent>
                </Box>
            </Card>
        </>
    )
}

export default Comment