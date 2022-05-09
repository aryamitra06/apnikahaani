import React from 'react'
import toast from 'react-hot-toast';
import { GoogleLogin } from 'react-google-login';
import { googleAuth } from '../../service/api';
import Grid from '@mui/material/Grid';
function Auth() {

    //google auth handle
    const googleSuccess = async (googleUser) => {
        var id_token = googleUser.getAuthResponse().id_token;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            xhr.send(JSON.stringify({ token: id_token }))
        };
        await googleAuth({ token: id_token });

        //saving auth to client side local storage
        const profileData = await googleUser.profileObj;
        const token = await googleUser.tokenId;
        localStorage.setItem('token', token);
        localStorage.setItem('name', profileData.name);
        localStorage.setItem('profilepic', profileData.imageUrl);
        localStorage.setItem('email', profileData.email);
        toast.success('Login successful')
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }
    //handles if fails
    const googleFailure = () => {
        toast.error('Login failed')
    }

    return (
        <>
            <Grid
                container
                justifyContent='center'
                marginTop={5}
            >
                <GoogleLogin
                    clientId="903948333203-5hlqr2q43lst7986r8oqq6c9cvqv821h.apps.googleusercontent.com"
                    onFailure={googleFailure}
                    onSuccess={googleSuccess}
                    cookiePolicy={'single_host_origin'}
                />
            </Grid>

        </>
    )
}

export default Auth