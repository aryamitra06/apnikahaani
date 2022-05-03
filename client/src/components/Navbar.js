import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

//mui 
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';

function Navbar() {

  const [user, setUser] = useState('');
  const [profilepic, setProfilepic] = useState('');

  useEffect(() => {
    const fetchData = () => {
      setUser(localStorage.getItem('name'));
      setProfilepic(localStorage.getItem('profilepic'))
    }
    fetchData();
  }, [])

  //handle logout
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const [anchorEl_categories, setAnchorEl_categories] = useState(null);
  const [anchorEl_profile, setAnchorEl_profile] = useState(null);

  const open_categories = Boolean(anchorEl_categories);
  const open_profile = Boolean(anchorEl_profile);

  const handleOpenCategories = (event) => {
    setAnchorEl_categories(event.currentTarget);
  };

  const handleClose_categories = () => {
    setAnchorEl_categories(null);
  };

  const handleOpenProfile = (event) => {
    setAnchorEl_profile(event.currentTarget);
  };

  const handleClose_profile = () => {
    setAnchorEl_profile(null);
  };


  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon onClick={handleOpenCategories} />
            </IconButton>
            <Menu
              anchorEl={anchorEl_categories}
              open={open_categories}
              onClose={handleClose_categories}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} onClick={handleClose_categories}><MenuItem>All</MenuItem></Link>
              <Link to="/?category=Rebirth" style={{ color: 'inherit', textDecoration: 'none' }} onClick={handleClose_categories}><MenuItem>Rebirth</MenuItem></Link>
              <Link to="/?category=Tragedy" style={{ color: 'inherit', textDecoration: 'none' }} onClick={handleClose_categories}><MenuItem>Tragedy</MenuItem></Link>
              <Link to="/?category=Quest" style={{ color: 'inherit', textDecoration: 'none' }} onClick={handleClose_categories}><MenuItem>Quest</MenuItem></Link>
              <Link to="/?category=Return" style={{ color: 'inherit', textDecoration: 'none' }} onClick={handleClose_categories}><MenuItem>Return</MenuItem></Link>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>ApniKahaani</Link>
            </Typography>
            
            {
              (localStorage.getItem('token')) ? (
                <Box marginRight={1}>
                  <Link to='/add' style={{ color: 'inherit', textDecoration: 'none' }}><Button variant="outlined">Add</Button></Link>
                </Box>
              ) : (
                <>
                </>
              )
            }
            {
              user ? (
                <>
                  <IconButton sx={{ p: 0 }} onClick={handleOpenProfile}>
                    <Avatar alt="Profile avatar" src={profilepic} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl_profile}
                    open={open_profile}
                    onClose={handleClose_profile}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem disabled>{user}</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Link to='/auth' style={{ color: 'inherit', textDecoration: 'none' }}><Button color="inherit">Login</Button></Link>
              )
            }
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
