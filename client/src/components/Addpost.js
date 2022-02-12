import { useState,useEffect } from 'react';
import { createPost,uploadFile } from '../service/api';
import { useHistory } from 'react-router-dom'
import React from 'react';

const initialValues = {
  title: '',
  desc: '',
  cover: '',
  category: 'Tragedy',
  username: 'aryamitra06',
  created: new Date()
}
function Addpost() {
  const history = useHistory();
  const [post, setPost] = useState(initialValues);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');

  const url = post.cover;

  useEffect(() => {
    const getImage = async () => { 
        if(file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);
            let image = await uploadFile(data);
            post.cover = image.data;
            setImage(image.data);
        }
    }
    getImage();
}, [file])

  const { title, desc } = post;
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
          <img src={url} alt="" srcset="" />
        </div>
      </div>
      <div className="viewpost-child">
        <div className="viewpost-post-body">

            <input onChange={(e) => handleChange(e)} type="text" name="title" value={title} id="title" placeholder='Title...' required />
            <input onChange={(e) => setFile(e.target.files[0])} type="file"/>
            <textarea onChange={(e) => handleChange(e)} name="desc" value={desc} id="desc" placeholder='Description...' required></textarea>
            <button onClick={() => publishPost()}>Publish</button>

        </div>
      </div>
    </>
  );
}

export default Addpost;
