import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, editPost } from '../service/api';
import { useHistory } from 'react-router-dom';

const initialValues = {
  title: '',
  desc: '',
  cover: '',
  category: 'All',
  username: 'aryamitra06',
  created: new Date()
}

function Editpost() {
  const history = useHistory();
  const { id } = useParams();
  const [post, setPost] = useState(initialValues);

  //getting form details from post
  useEffect(() => {
    const fetchData = async () => {
      let data = await getPost(id);
      setPost(data);
    }
    fetchData();
  }, []);

  //button click to submit updated form
  const editPostHandle = async () => {
    await editPost(id, post);
    history.push(`/view/${id}`);
}

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  return(
      <>
      <div className="viewpost-parent">
        <div className="viewpsot-header">
            <img src="https://images.pexels.com/photos/10937212/pexels-photo-10937212.jpeg" />
        </div>
      </div>
      <div className="viewpost-child">
          <div className="viewpost-post-body">
              <input onChange={(e) => handleChange(e)} type="text" name="title" value={post.title}  placeholder='Title...'/>
              <input type="file" name="" id="" required/>
              <textarea onChange={(e) => handleChange(e)} name="desc" value={post.desc} placeholder='Description...'></textarea>
              <button type="submit" onClick={() => editPostHandle()} >Save</button>
          </div>
      </div>
      </>
  );
}

export default Editpost;
