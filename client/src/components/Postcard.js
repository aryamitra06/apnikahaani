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
          <Chip label={props.category} sx={{marginBottom: 1}}/>
          <Typography gutterBottom variant="h5">
          {props.title.slice(0,30)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {props.desc.slice(0,55)}...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

            {/* <div className="post-body">
                <div className="post-body-image"><img src={props.cover}/></div>
                <div className="post-body-details">
                    <p className="post-body-details-category">{props.category}</p>
                    <p className="post-body-details-title">{props.title.slice(0,30)}...</p>
                    <p className="post-body-details-author">{props.author}</p>
                    <p className="post-body-details-description">{props.desc.slice(0,55)}...</p>
                </div>
            </div> */}
        </>
    );
}

export default Postcard;
