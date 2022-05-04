import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getPost, deletePost } from '../service/api';
import Comments from './Comments';

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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Viewpost() {
  const history = useHistory();
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let data = await getPost(id);
      setPost(data);
    }
    fetchData();
  }, [id]);

  const deletePostHandle = async () => {
    await deletePost(id);
    history.push('/');
  }

  //alert dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container sx={{ marginTop: 10}} justifyContent='center' alignItems='center' spacing={3}>
        <Grid item sm={11} xs={11} md={7} lg={7} xl={7}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={post.cover}
              alt="green iguana"
            />
            <CardContent>
              <Grid container justifyContent='space-between' alignItems='center'>
                <Grid>
                  <Typography gutterBottom variant="h5">
                    {post.title}
                  </Typography>
                </Grid>
                <Grid sx={{ position: 'relative', top: -70 }}>
                  <Chip label={post.category} color="primary" />
                </Grid>
              </Grid>
              <Typography variant="body2" color="primary">
                By <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/?email=${post.email}`}><b>{post.email}</b></Link> at {new Date(post.created).toDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.desc}
              </Typography>
            </CardContent>
            <CardActions>
              {
                localStorage.getItem('token') && (post.email === localStorage.getItem('email')) ? (
                  <>
                    <Link style={{ textDecoration: 'none', color: 'inherit', marginRight: '7px' }} to={`/edit/${post._id}`}><Button variant="outlined" startIcon={<EditIcon />}>Edit</Button></Link>
                    <Button onClick={handleClickOpen} variant="outlined" color="error" startIcon={<DeleteIcon />}>Delete</Button>
                  </>
                ) : (
                  <>
                  </>
                )
              }

            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={11} xs={11} md={3} lg={3} xl={3}>
          {
            localStorage.getItem('token') ? (
              <Comments id={post._id} />
            ) : (
              <>
              </>
            )
          }
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='error' onClick={() => deletePostHandle()} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Viewpost;
