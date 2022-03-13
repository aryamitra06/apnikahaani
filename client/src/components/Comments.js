import React from 'react'
import { useEffect, useState } from 'react'
import { getComments } from '../service/api'
import Comment from './Comment'
import Addcomment from './Addcomment'

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
            <Addcomment id={props.id} setToggle = {setToggle}/>
            <div className="container">
                <h3>All Comments</h3>
                {
                    comments && comments.map(comment => (
                        <Comment email= {comment.email} date={comment.date} comment = {comment.comment} id = {comment._id} profilephoto={comment.profilephoto} setToggle = {setToggle}/>
                    )
                    )
                }
            </div>
        </>
    )
}

export default Comments