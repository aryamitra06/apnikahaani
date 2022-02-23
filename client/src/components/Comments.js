import React, { useState } from 'react'
import { newComment } from '../service/api';
function Comments(props) {

    const initialValue = {
        name: '',
        postId: '',
        date: new Date(),
        comment: ''
    }

    const [comment, setComment] = useState(initialValue);

    const handleChange = (e) =>{
        setComment({
            ...comment,
            name: 'aryamitra06',
            postId: props.id,
            comment: e.target.value
        })
    }
    const postComment = async() =>{
        await newComment(comment);
    }
  return (
    <>
    <div className="container mt-3 mb-5">
    <div className="input-group mb-3">
        <img src={localStorage.getItem('profilepic')} alt="user"/>
        <input type="text" 
        className="form-control" 
        placeholder="What do you think about this story?" 
        onChange={(e)=> handleChange(e)}/>
    </div>
    <button 
    className="btn btn-outline-secondary w-100" 
    type="button"
    onClick={()=> postComment()}>Post Comment</button>
    </div>
    </>
  )
}

export default Comments