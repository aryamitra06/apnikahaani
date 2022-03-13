import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, editPost, uploadFile } from '../service/api';
import { useHistory } from 'react-router-dom';

const initialValues = {
  title: '',
  desc: '',
  cover: '',
  category: 'Uncategorized',
  email: localStorage.getItem('email'),
  created: new Date()
}

function Editpost() {
  const history = useHistory();

  const { id } = useParams();
  const [post, setPost] = useState(initialValues);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');

  //getting form details from post
  useEffect(() => {
    const fetchData = async () => {
      let data = await getPost(id);
      setPost(data);
    }
    fetchData();
  }, []);

  //image handing
  useEffect(() => {
    const fetchImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        let image = await uploadFile(data);
        post.cover = image.data;
        setImage(image.data);
      }
    }
    fetchImage();
  }, [file])


  //button click to submit updated form
  const editPostHandle = async () => {
    await editPost(id, post);
    history.push(`/view/${id}`);
  }

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  if (!localStorage.getItem('token') || post.email !== localStorage.getItem('email')) {
    history.push('/?error=notallowed');
  }


  return (
    <>
      <div className="viewpost-parent">
        <div className="viewpsot-header">
          <img src={post.cover} />
        </div>
      </div>
      <div className="viewpost-child">
        <div className="viewpost-post-body">
          <select className="form-select mb-3 mt-4" onChange={(e) => handleChange(e)} value={post.category} name="category">
            <option value="Uncategorized">Select...</option>
            <option value="Rebirth">Rebirth</option>
            <option value="Tragedy">Tragedy</option>
            <option value="Quest">Quest</option>
            <option value="Return">Return</option>
          </select>
          <input className="form-control" onChange={(e) => setFile(e.target.files[0])} type="file" />
          <input onChange={(e) => handleChange(e)} className="title-box" type="text" name="title" value={post.title} placeholder='Title...' />
          <textarea onChange={(e) => handleChange(e)} name="desc" value={post.desc} placeholder='Description...'></textarea>
          <button type="submit" onClick={() => editPostHandle()} >Save</button>
        </div>
      </div>
    </>
  );
}

export default Editpost;
