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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPosts(search);
      setPosts(data);
    }
    fetchData();
  }, [search]);

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
      >
        {posts.map(post => (
          <Grid item sm={10} xs={12} md={4} lg={4} xl={2}>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/view/${post._id}`}><Postcard category={post.category} title={post.title} author={post.email} desc={post.desc} cover={post.cover} /></Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Posts;