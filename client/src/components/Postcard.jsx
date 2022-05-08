import * as React from 'react';
import { Link } from "react-router-dom";
import Comments from './Comments';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import EditDialog from './EditDialog';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Postcard(props) {
  const [anchorEl_postaction, setanchorEl_postaction] = React.useState(null);
  const open_postaction = Boolean(anchorEl_postaction);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenPostAction = (event) => {
    setanchorEl_postaction(event.currentTarget);
  };

  const handleClose_postaction = () => {
    setanchorEl_postaction(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setanchorEl_postaction(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
        <Card sx={{ marginTop: '15px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} src={props.profilephoto}>
          </Avatar>
        }
        action={
          <>
            <IconButton onClick={handleOpenPostAction}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl_postaction}
              open={open_postaction}
              onClose={handleClose_postaction}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClickOpen}>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </Menu>
          </>
        }
        title={props.author.substring(0, props.author.lastIndexOf("@"))}
        subheader={new Date(props.created).toDateString()}
      />
      <CardMedia
        component="img"
        height="300"
        image={props.cover}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {props.desc}
            <Comments id={props.id}/>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    <EditDialog open={open} handleClose={handleClose} id={props.id} setOpen={setOpen} toggle={props.toggle} setToggle={props.setToggle}/>
    </>
  );
}