import { useState, useEffect } from 'react';
import { createPost, uploadFile } from '../../service/api';
import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import toast from 'react-hot-toast';



const initialValues = {
  title: '',
  desc: '',
  cover: 'https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg',
  category: 'Uncategorized',
  email: localStorage.getItem('email'),
  profilephoto: localStorage.getItem('profilepic'),
  created: new Date()
}

function AddPostHome(props) {

  const [post, setPost] = useState(initialValues);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg');
  const [loading, setloading] = useState(false);

  
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
    setloading(true)
    try {
      await createPost(post);
      toast.success('Post successful')
      props.setToggle(prev => !prev);
      setPost({
        title: '',
        desc: '',
        cover: 'https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg',
        category: 'Uncategorized',
        email: localStorage.getItem('email'),
        profilephoto: localStorage.getItem('profilepic'),
        created: new Date()
      })
      setloading(false)
      
    } catch (err) {
      setloading(false)
      toast.error('Something went wrong')
    }
  }

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <>
          <Card sx={{marginBottom: '20px'}}>
            <CardMedia
              component="img"
              height="110"
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
            <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField fullWidth label="Title" variant="outlined" sx={{ marginBottom: 2 }} type="text" name="title" value={post.title} onChange={(e) => handleChange(e)} required/>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
                </Grid>
            </Grid>
              <TextField
                sx={{ marginTop: 2 }}
                label="Description"
                multiline
                rows={2}
                fullWidth
                type='text'
                name="desc"
                value={post.desc}
                onChange={(e) => handleChange(e)}
                required
              />
            </CardContent>
            <CardActions>
              <LoadingButton fullWidth onClick={() => publishPost()} size="medium" disabled={post.title.length===0 || post.desc.length===0} loading={loading} loadingIndicator="Posting...">Post</LoadingButton>
            </CardActions>
          </Card>
    </>
  );
}

export default AddPostHome;
