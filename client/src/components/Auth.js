import React from 'react'
import {GoogleLogin} from 'react-google-login';
import {useHistory} from 'react-router-dom';
import { googleAuth } from '../service/api';
function Auth() {
    const history = useHistory();

    //google auth handle
    const googleSuccess = async (googleUser) =>{
        // const profileData = await googleUser.profileObj;
        // const token = await googleUser.tokenId;
        // localStorage.setItem('token', token); 
        // localStorage.setItem('name', profileData.name); 
        // localStorage.setItem('profilepic', profileData.imageUrl);
        // localStorage.setItem('email', profileData.email);
        // history.push('/')
        // window.location.href = '/';
        var id_token = googleUser.getAuthResponse().id_token;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
        xhr.send(JSON.stringify({token: id_token}))
        };
        await googleAuth({token: id_token});
    }
    const googleFailure = () =>{
        console.log("Failed to login with google!");
    }

    return (
        <>
        <div className="container mt-3 d-flex justify-content-center">
                    <GoogleLogin
                    clientId="903948333203-5hlqr2q43lst7986r8oqq6c9cvqv821h.apps.googleusercontent.com"
                    onFailure={googleFailure}
                    onSuccess={googleSuccess}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    />
        </div>
                
        </>
    )
}

export default Auth