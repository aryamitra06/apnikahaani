import React from 'react';
import {Link } from "react-router-dom";
function Navbar() {
  return (
      <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 bg-white rounded">
  <div className="container">
    <Link className="navbar-brand" to="/">ApniKahani</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <input type="checkbox"></input>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        <Link className="nav-link active" aria-current="page" to="/about">About</Link>
      </div>
    </div>
  </div>
</nav>
      </>
  );
}

export default Navbar;
