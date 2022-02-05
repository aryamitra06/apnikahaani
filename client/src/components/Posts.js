import React from 'react';
import { Link } from 'react-router-dom';
import Addstory from './Addstory';
import Postcard from './Postcard';

function Posts() {
    let posts = [1,2,3,4,5];
  return(
      <>
      <Addstory/>
      <div className="posts-parent-container" data-simplebar>
      {posts.map(post => (
        <Link className='link' to='/view'><Postcard title="This is the title"/></Link>
      ))}
          
      </div>
      </>
  );
}

export default Posts;
