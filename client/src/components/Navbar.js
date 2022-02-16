import React, {useState, useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const [user, setUser] = useState('');
  const [profilepic, setProfilepic] = useState('');

  useEffect(() => {
    const fetchData = () => {
     setUser(localStorage.getItem('name'));
     setProfilepic(localStorage.getItem('profilepic'))
    }
    fetchData();
  }, [location])

  //handle logout
  const logout = () =>{
    localStorage.clear();
    window.location.href = '/';
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 bg-white rounded">
        <div className="container">
          <Link className="navbar-brand" to="/">🔖ApniKahaani</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <input type="checkbox"></input>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {
                user ? (
                  <>
                  <img src={profilepic} alt="profile photo" className='profile-pic' />
                  <Link className="nav-link active user-name" aria-current="page" to="/">{user}</Link>
                  </>
                ):(
                  <></>
                )}
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className="nav-link active" aria-current="page" to="/about">About</Link>
            </div>

            <div className="auth-details">
              {
                user ? (
                  <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
                ) : (
                  <Link to='/auth'><button type="button" className="btn btn-primary">Login</button></Link>
                )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
