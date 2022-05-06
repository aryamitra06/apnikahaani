import { useState, useEffect } from 'react';
import { createPost, uploadFile } from '../service/api';
import { useHistory } from 'react-router-dom'
import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AppAlert from './AppAlert';




const initialValues = {
  title: '',
  desc: '',
  cover: 'https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg',
  category: 'Uncategorized',
  email: localStorage.getItem('email'),
  created: new Date()
}

function Addpost() {

  let history = useHistory();
  if (!localStorage.getItem('token')) {
    history.push('/');
  }

  const [post, setPost] = useState(initialValues);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg');
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  useEffect(() => {
    const fetchImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        let image = await uploadFile(data);
        post.cover = image.data;
        setImage(post.cover);
      }
    }
    fetchImage();
  }, [file])


  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  const publishPost = async () => {
    try {
      await createPost(post);
      history.push('/');
      
    } catch (err) {
      setOpen(true);
    }
  }

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <>
      <Grid
        container
        sx={{ marginTop: 15 }}
        justifyContent='center'
      >
        <Grid item sm={10} xs={11} md={10} lg={6} xl={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={image}
              alt="green iguana"
            />
            <CardContent>
              <Grid container justifyContent='space-between' alignItems='center'>
                <Grid>
                  <Typography gutterBottom variant="h5">
                    Add Post
                  </Typography>
                </Grid>
                <Grid sx={{ position: 'relative', top: -70 }}>
                  <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) => setFile(e.target.files[0])}/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Grid>
              </Grid>
              <TextField fullWidth label="Title" variant="outlined" sx={{ marginBottom: 2 }} type="text" name="title" value={post.title} onChange={(e) => handleChange(e)} required/>
              <FormControl fullWidth required>
                <InputLabel id="select-label">Category</InputLabel>
                <Select
                  id="select-label"
                  label="Category"
                  onChange={(e) => handleChange(e)}
                  value={post.category}
                  name="category"
                >
                  <MenuItem value="Uncategorized">
                    <em>Uncategorized</em>
                  </MenuItem>
                  <MenuItem value="Rebirth">Rebirth</MenuItem>
                  <MenuItem value="Tragedy">Tragedy</MenuItem>
                  <MenuItem value="Quest">Quest</MenuItem>
                  <MenuItem value="Return">Return</MenuItem>
                </Select>
              </FormControl>
              <TextField
                sx={{ marginTop: 2 }}
                label="Description"
                multiline
                rows={4}
                fullWidth
                type='text'
                name="desc"
                value={post.desc}
                onChange={(e) => handleChange(e)}
                required
              />
            </CardContent>
            <CardActions>
              <Button onClick={() => publishPost()} size="medium" disabled={post.title.length===0 || post.desc.length===0}>Post</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <AppAlert type="error" msg="Toxicity detected, try again." open={open} handleClose={handleClose} />
    </>
  );
}

export default Addpost;
