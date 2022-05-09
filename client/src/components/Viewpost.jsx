import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../service/api';
import Comments from './Comments';
import ShareIcon from '@mui/icons-material/Share';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';

import EditDialog from '../components/Dialogs/EditDialog';
import DeleteDialog from '../components/Dialogs/DeleteDialog';

import { IconButton } from '@mui/material';
import SocialShareDialog from './Dialogs/SocialShareDialog';


function Viewpost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [open, setOpen] = React.useState(false);
  const [open_delete, setOpen_delete] = React.useState(false);
  const [open_social, setOpen_social] = React.useState(false);
  const [toggle, setToggle] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenForDelete = () => {
    setOpen_delete(true);
  };

  const handleCloseForDelete = () => {
    setOpen_delete(false);
  };

  const handleClickOpenForSocial = () => {
    setOpen_social(true);
  };

  const handleCloseForSocial = () => {
    setOpen_social(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      let data = await getPost(id);
      setPost(data);
    }
    fetchData();
  }, [id, toggle]);

  const url = window.location.href;
  return (
    <>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Grid item xs={11} sm={9} md={7} lg={6} xl={6} sx={{ width: '100%', marginBottom: 3 }}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={post.cover}
              alt="green iguana"
            />
            <CardContent>
              <Grid container justifyContent='space-between' alignItems='center'>
                <Grid sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Avatar src={post.profilephoto} />
                  <Grid>
                    <Typography variant="body1">
                      <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/?email=${post.email}`}>{post.email}</Link>
                    </Typography>
                    <Typography variant="body2" color='gray'>
                      {new Date(post.created).toDateString()}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', top: -70, gap: '7px' }}>
                  <Chip label={post.category} color="primary" />
                </Grid>
              </Grid>
              <Typography gutterBottom variant="h6" marginTop='10px'>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.desc}
              </Typography>
            </CardContent>
            <CardActions>
                  <>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <IconButton aria-label="share" onClick={handleClickOpenForSocial}>
                          <ShareIcon />
                        </IconButton>
                      </div>
                      <div>
                        {
                          (post.email === localStorage.getItem('email')) ? (
                            <>
                              <IconButton onClick={handleClickOpen} variant="outlined"><EditIcon /></IconButton>
                              <IconButton onClick={handleClickOpenForDelete} variant="outlined" color="error"><DeleteIcon /></IconButton>
                            </>
                          ) : (
                            <>
                            </>
                          )
                        }
                      </div>
                    </div>
                  </>
                  <>
                  </>


            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={11} sm={9} md={7} lg={6} xl={6} sx={{ width: '100%' }}>
          <Comments id={post._id} />
        </Grid>
      </Grid>
      <EditDialog open={open} handleClose={handleClose} id={post._id} setOpen={setOpen} toggle={toggle} setToggle={setToggle} />
      <DeleteDialog open={open_delete} handleClose={handleCloseForDelete} id={post._id} setOpen={setOpen_delete} toggle={toggle} setToggle={setToggle} />
      <SocialShareDialog open={open_social} handleClose={handleCloseForSocial} url={url} setOpen={setOpen_social} />
    </>
  );
}

export default Viewpost;
