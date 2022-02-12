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

  const url = post.cover ? post.cover : 'https://images.pexels.com/photos/10937212/pexels-photo-10937212.jpeg';

  useEffect(() => {
    const getImage = async () => { 
        if(file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);
            const image = await uploadFile(data);
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
          <form>
            <input onChange={(e) => handleChange(e)} type="text" name="title" value={title} id="title" placeholder='Title...' required />
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
            />
            <textarea onChange={(e) => handleChange(e)} name="desc" value={desc} id="desc" placeholder='Description...' required></textarea>
            <button type="submit" onClick={() => publishPost()}>Publish</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addpost;
