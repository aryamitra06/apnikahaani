import React from 'react'
import { useEffect, useState } from 'react'
import { getComments } from '../service/api'
import Comment from './Comment'
import Addcomment from './Addcomment'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

function Comments(props) {
    const [comments, setComments] = useState([])
    const [toggle, setToggle] = useState(false)
    useEffect(() => {
        const getData = async () => {
            const res = await getComments(props.id)
            setComments(res);
        }
        getData();
    }, [props.id, toggle])
    return (
        <>
            <Addcomment id={props.id} setToggle={setToggle} />
            <Typography variant="h6" gutterBottom color='white' mt={2}>
                All Comments
            </Typography>
            {
                (comments.length === 0) ? (
                    <>
                    <Grid container justifyContent='flex-start' alignItems='center'>
                        <Alert severity="error">No Comment Found</Alert>
                    </Grid>
                    </>
                ) : (
                    <>
                        <Grid container justifyContent='center' alignItems='center' maxHeight='360px' overflow='auto'>
                            {
                                comments.map(comment => (
                                    <Comment email={comment.email} date={comment.date} comment={comment.comment} id={comment._id} profilephoto={comment.profilephoto} setToggle={setToggle} />
                                )
                                )
                            }
                        </Grid>
                    </>
                )
            }
        </>
    )
}

export default Comments