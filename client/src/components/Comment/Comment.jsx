import React from 'react'
import { deleteComment } from '../../service/api';
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
                            <Grid item sm={10} xs={9} md={10} lg={10} xl={10}>
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
                                        <Grid item sm={1} xs={1} md={1} lg={1} xl={1}>
                                            <IconButton color='error' aria-label="delete" onClick={() => deleteCommentHandle()}>
                                                <DeleteIcon/>
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