import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../service/api';
import Addstory from './Addstory';
import Postcard from './Postcard';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPosts();
      console.log(data);
      setPosts(data);
    }
    fetchData();
  }, []);
  
  return(
      <>
      <Addstory/>
      <div className="posts-parent-container" data-simplebar>
      {posts.map(post => (
        <Link className='link' to={`/view/${post._id}`}><Postcard category = {post.category} title={post.title} author = {post.username} desc = {post.desc} /></Link>
      ))}
          
      </div>
      </>
  );
}

export default Posts;
