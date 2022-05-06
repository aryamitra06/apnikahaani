import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, editPost, uploadFile } from '../service/api';
import { useHistory } from 'react-router-dom';
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

import AppAlert from './AppAlert';

  const Input = styled('input')({
    display: 'none',
  });
  const initialValues = {
    title: '',
    desc: '',
    cover: '',
    category: 'Uncategorized',
    email: localStorage.getItem('email'),
    created: new Date()
  }
  
  function Editpost() {
    const history = useHistory();
  
    const { id } = useParams();
    const [post, setPost] = useState(initialValues);
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [open, setOpen] = useState(false);
    const [msg, setmsg] = useState("");
    const [type, settype] = useState("");
    const [loading, setloading] = useState(false);

    const handleClose = (reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    //getting form details from post
    useEffect(() => {
      const fetchData = async () => {
        let data = await getPost(id);
        setPost(data);
      }
      fetchData();
    }, []);
  
    //image handing
    useEffect(() => {
      const fetchImage = async () => {
        if (file) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);
          let image = await uploadFile(data);
          post.cover = image.data;
          setImage(image.data);
        }
      }
      fetchImage();
    }, [file])
  
  
    //button click to submit updated form
    const editPostHandle = async () => {
      setloading(true)
      try {
        await editPost(id, post);
        setOpen(true);
        setmsg("Updated");
        settype("success");
        setTimeout(() => {
          history.push(`/view/${id}`);
        }, 2000)
      } catch (error) {
        setOpen(true);
        setmsg("Toxicity detected, try again!");
        settype("error");
        setloading(false)
      }
    }
  
    const handleChange = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  
    if (!localStorage.getItem('token') || post.email !== localStorage.getItem('email')) {
      history.push('/?error=notallowed');
    }

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
              image={post.cover}
              alt="cover banner"
            />
            <CardContent>
              <Grid container justifyContent='space-between' alignItems='center'>
                <Grid>
                  <Typography gutterBottom variant="h5">
                    Edit Post
                  </Typography>
                </Grid>
                <Grid sx={{ position: 'relative', top: -70 }}>
                  <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Grid>
              </Grid>
              <TextField fullWidth label="Title" variant="outlined" sx={{ marginBottom: 2 }} type="text" name="title" value={post.title} onChange={(e) => handleChange(e)} required />
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
              <LoadingButton fullWidth onClick={() => editPostHandle()} size="medium" disabled={post.title.length === 0 || post.desc.length === 0} loading={loading} loadingIndicator="Updating...">Save</LoadingButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <AppAlert type={type} msg={msg} open={open} handleClose={handleClose} />
    </>
  );
}

export default Editpost;
