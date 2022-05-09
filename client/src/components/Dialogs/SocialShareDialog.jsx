import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    TwitterIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon
  } from "react-share";

export default function SocialShareDialog(props) {
    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
            >
                <DialogTitle>
                    Share
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{display: 'flex', gap: '30px'}}>
                  <WhatsappShareButton url={props.url}>
                    <WhatsappIcon size={50} round={true} />
                  </WhatsappShareButton>
                  <FacebookShareButton url={props.url} >
                    <FacebookIcon size={50} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={props.url} >
                    <TwitterIcon size={50} round={true} />
                  </TwitterShareButton>
                  <FacebookMessengerShareButton url={props.url} >
                    <FacebookMessengerIcon size={50} round={true} />
                  </FacebookMessengerShareButton>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
