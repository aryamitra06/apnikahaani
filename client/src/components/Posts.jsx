import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllPosts } from '../service/api';
import Postcard from './Postcard';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

function Posts() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [toggle, setToggle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPosts(search);
      setPosts(data);
    }
    fetchData();
  }, [search, toggle]);

  if (posts.length === 0)
    return (
      <>
        <Grid container sx={{ justifyContent: 'center', marginTop: '20px' }}>
          <Grid item sm={10} xs={10} md={7} lg={7} xl={7}>
            <Alert severity="error">No Post Found</Alert>
          </Grid>
        </Grid>
      </>
    )
  return (
    <>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        {posts.map(post => (
          <Grid item xs={11} sm={9} md={7} lg={6} xl={5} sx={{width: '100%'}}>
            <Postcard category={post.category} id={post._id} title={post.title} author={post.email} desc={post.desc} cover={post.cover} profilephoto={post.profilephoto} created={post.created} toggle={toggle} setToggle={setToggle}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Posts;