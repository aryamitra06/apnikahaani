import React from 'react';

function Viewpost() {
  return(
      <>
      <div className="viewpost-parent">
        <div className="viewpsot-header">
        <span className="share-btn"><i class="fas fa-share"></i></span>
            <img src="https://images.pexels.com/photos/10937212/pexels-photo-10937212.jpeg" alt="" srcset="" />
        </div>
      </div>
      <div className="viewpost-child">
          <div className="viewpost-post-body">
              <p className="viewpost-post-title">Post Title</p>
              <p className="viewpost-post-author-and-post-date">By Aryamitra Chaudhuri 2.2.2022</p>
              <p className="viewpost-post-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Ea mollitia quo, harum ipsam, hic alias modi rem, beatae temporibus quia est veniam unde doloremque! 
              Exercitationem dolores laboriosam facere praesentium excepturi.</p>
          </div>
      </div>
      </>
  );
}

export default Viewpost;
