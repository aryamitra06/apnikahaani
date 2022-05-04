import React from 'react'
import { useEffect, useState } from 'react'
import { getComments } from '../service/api'
import Comment from './Comment'
import Addcomment from './Addcomment'
import Typography from '@mui/material/Typography';

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
                <div className="allcomments-div">
                {
                    comments && comments.map(comment => (
                        <Comment email={comment.email} date={comment.date} comment={comment.comment} id={comment._id} profilephoto={comment.profilephoto} setToggle={setToggle} />
                    )
                    )
                }
                </div>
        </>
    )
}

export default Comments