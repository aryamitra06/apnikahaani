import { useState } from 'react';
import { createPost } from '../service/api';
import {useHistory } from 'react-router-dom'
import React from 'react';

const initialValues = {
  title: '',
  desc: '',
  cover: '',
  category: 'All',
  username: 'aryamitra06',
  created: new Date()
}
function Addpost() {
  const history = useHistory();
  const [post, setPost] = useState(initialValues);
  const {title, desc} = post;

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  const publishPost = async () => {
    await createPost(post);
    history.push('/');
  }
  return(
      <>
      <div className="viewpost-parent">
        <div className="viewpsot-header">
            <img src="https://images.pexels.com/photos/10937212/pexels-photo-10937212.jpeg" alt="" srcset="" />
        </div>
      </div>
      <div className="viewpost-child">
          <div className="viewpost-post-body">
              <input onChange={(e) => handleChange(e)} type="text" name="title" value={title} id="title" placeholder='Title...' required/>
              {/* <input onChange={(e) => handleChange(e)} type="file" name="" id="" required/> */}
              <textarea onChange={(e) => handleChange(e)} name="desc" value={desc} id="desc" placeholder='Description...' required></textarea>
              <button type="submit" onClick={() => publishPost()}>Publish</button>
          </div>
      </div>
      </>
  );
}

export default Addpost;
