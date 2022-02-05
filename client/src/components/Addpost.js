import React from 'react';

function Addpost() {
  return(
      <>
      <div className="viewpost-parent">
        <div className="viewpsot-header">
            <img src="https://images.pexels.com/photos/10937212/pexels-photo-10937212.jpeg" alt="" srcset="" />
        </div>
      </div>
      <div className="viewpost-child">
          <div className="viewpost-post-body">
            <form action="" method="post">
              <input type="text" name="title" id="" placeholder='Title...' required/>
              <input type="file" name="" id="" required/>
              <textarea name="" id="" placeholder='Description...' required></textarea>
              <button type="submit">Publish</button>
            </form>  
          </div>
      </div>
      </>
  );
}

export default Addpost;
