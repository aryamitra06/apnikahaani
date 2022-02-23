import React from 'react'

function Comments() {
  return (
    <>
    <div className="container mt-3 mb-5">
    <div className="input-group mb-3">
        <img src={localStorage.getItem('profilepic')} alt="user"/>
        <input type="text" className="form-control" placeholder="What do you think about this story?" aria-describedby="button-addon2"/>
    </div>
    <button className="btn btn-outline-secondary w-100" type="button">Post Comment</button>
    </div>
    </>
  )
}

export default Comments