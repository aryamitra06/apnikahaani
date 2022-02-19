import { useState, useEffect } from 'react';
import { createPost, uploadFile } from '../service/api';
import { useHistory } from 'react-router-dom'
import React from 'react';


const initialValues = {
  title: '',
  desc: '',
  cover: '',
  category: 'Uncategorized',
  username: localStorage.getItem('email'),
  created: new Date()
}

function Addpost() {

  let history = useHistory();
  // if(!localStorage.getItem('token')){
  //   history.push('/');
  // }
  
  const [post, setPost] = useState(initialValues);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        let image = await uploadFile(data);
        post.cover = image.data;
        setImage(post.cover);
      }
    }
    fetchImage();
  }, [file])


  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  const publishPost = async () => {
    await createPost(post);
    history.push('/');
  }

  return (
    <>
      <div className="viewpost-parent">
        <div className="viewpsot-header">
          <img src={image} alt="Add Cover Photo for your story..." />
        </div>
      </div>
      <div className="viewpost-child">
        <div className="viewpost-post-body">

          <input onChange={(e) => handleChange(e)} type="text" name="title" value={post.title} id="title" placeholder='Title...' required />
          <select onChange={(e) => handleChange(e)} value={post.category} name="category">
            <option value="Uncategorized">Select...</option>
            <option value="Rebirth">Rebirth</option>
            <option value="Tragedy">Tragedy</option>
            <option value="Quest">Quest</option>
            <option value="Return">Return</option>
          </select>
          <input onChange={(e) => setFile(e.target.files[0])} type="file" />
          <textarea onChange={(e) => handleChange(e)} name="desc" value={post.desc} id="desc" placeholder='Description...' required></textarea>
          <button onClick={() => publishPost()}>Publish</button>

        </div>
      </div>
    </>
  );
}

export default Addpost;
