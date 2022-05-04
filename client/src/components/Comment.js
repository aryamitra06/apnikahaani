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
                                <Typography component="div" variant="h5">
                                    {props.comment}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {props.email}
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
            {/* <div class="card mt-4 mb-4">

                    <div className="details" style={{ width: "90%" }}>
                        <>
                            <h6 className='mx-3'>{props.name}</h6>
                            <p className='mx-3'>{new Date(props.date).toDateString()}</p>
                            <p className='mx-3'>{props.comment}</p>
                        </>
                    </div>
                    {
                        (props.email === localStorage.getItem('email')) ? (
                            <>
                                <div className="deletepost text-end">
                                    <button type="button" className="btn btn-danger" onClick={() => deleteCommentHandle()}><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                </div>
            </div> */}
        </>
    )
}

export default Comment