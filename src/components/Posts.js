import React from 'react';
import Addstory from './Addstory';
import Postcard from './Postcard';

function Posts() {
    let posts = [1,2,3,4,5];
  return(
      <>
      <Addstory/>
      <div className="posts-parent-container" data-simplebar>
      {posts.map(post => (
        <Postcard title="This is the title"/>
      ))}
          
      </div>
      </>
  );
}

export default Posts;
