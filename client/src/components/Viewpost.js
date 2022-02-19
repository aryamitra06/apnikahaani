import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getPost, deletePost } from '../service/api';

function Viewpost() {
  const history = useHistory();
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let data = await getPost(id);
      setPost(data);
    }
    fetchData();
  }, []);

  const deletePostHandle = async () => {
    await deletePost(id);
    history.push('/');
  }

  return (
    <>
      <div className="viewpost-parent">
        <div className="viewpsot-header">
          <img src={post.cover} alt="" srcset="" />
        </div>
      </div>
      <div className="viewpost-child">
        <div className="viewpost-post-body">
          <p className="viewpost-post-title">{post.title}</p>
          <p className="viewpost-post-author-and-post-date">By <Link className='link' to={`/?username=${post.username}`}>{post.username}</Link> at {new Date(post.created).toDateString()}</p>
          <p className="viewpost-post-description">{post.desc}</p>

          {
            post.username === localStorage.getItem('email') && localStorage.getItem('token') ? (
          <>
          <Link className='link' to={`/edit/${post._id}`}>
          <p className='edit-btn'><i className="fas fa-edit"></i> Edit</p>
          </Link>
          </>
            ) : (
            <></>
            )}
          {
            post.username === localStorage.getItem('email') && localStorage.getItem('token') ? (
          <>
          <p className='del-btn' onClick={() => deletePostHandle()}><i className="fas fa-trash"></i> Delete</p>
          </>
            ) : (
            <></>
            )}


        </div>
      </div>
    </>
  );
}

export default Viewpost;
