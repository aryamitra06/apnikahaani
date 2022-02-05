import React from 'react';
import Addstory from './Addstory';
import Postcard from './Postcard';

function Posts() {
  return(
      <>
      <Addstory/>
      <div className="posts-parent-container" data-simplebar>
          <Postcard/>
          <Postcard/>
          <Postcard/>
          <Postcard/>
          <Postcard/>
          <Postcard/>
      </div>
      </>
  );
}

export default Posts;
