import React from 'react';
import {Link } from "react-router-dom";
function Addstory() {
  return (
      <>
      <div className="container add-story-parent-container">
      <Link to="/add"><p className="addstory-btn"><i className="fas fa-plus"></i> Add Story</p></Link>
      </div> 
      </>
  );
}

export default Addstory;
