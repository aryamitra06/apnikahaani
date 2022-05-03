import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';

function Postcard(props) {
    return (
        <>
    <Card sx={{margin: '10px'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.cover}
          alt="post cover"
        />
        <CardContent>
          <Chip variant="outlined" color="primary" label={props.category} sx={{marginBottom: 1}}/>
          <Typography variant="body2" color="text.secondary">
           {props.author}
          </Typography>
          <Typography gutterBottom variant="h5">
          {props.title.slice(0,30)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {props.desc.slice(0,55)}...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </>
    );
}

export default Postcard;
