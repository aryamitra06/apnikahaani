import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllPosts } from '../service/api';
import Postcard from './Postcard';

function Posts() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPosts(search);
      setPosts(data);
    }
    fetchData();
  }, [search]);

  return (
    <>
      <div className="container add-story-parent-container">
        <Link to="/add"><p className="addstory-btn"><i className="fas fa-plus"></i> Add Story</p></Link>
      </div>
      <div className="posts-parent-container" data-simplebar>
        {posts.map(post => (
          <Link className='link' to={`/view/${post._id}`}><Postcard category={post.category} title={post.title} author={post.username} desc={post.desc} /></Link>
        ))}

      </div>
    </>
  );
}

export default Posts;
