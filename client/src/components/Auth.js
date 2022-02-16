import React from 'react'
import {GoogleLogin} from 'react-google-login';
import {useHistory} from 'react-router-dom';
function Auth() {
    const history = useHistory();
    const handleSubmit = () =>{

    }
    const handleChange = () =>{

    }

    //google auth handle
    const googleSuccess = async (res) =>{
        const profileData = await res.profileObj;
        const token = await res.tokenId;
        localStorage.setItem('token', token); 
        localStorage.setItem('name', profileData.name); 
        localStorage.setItem('profilepic', profileData.imageUrl);
        localStorage.setItem('email', profileData.email);
        
        console.log(profileData);
        // window.location.href = '/';
        history.push('/')
    }
    const googleFailure = () =>{
        console.log("Failed to login with google!");
    }

    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-5 col-sm-12 mt-4">
                        <h3 className="mb-3">Login to your account</h3>
                        <form method='post' onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="email" className="form-control" onChange={handleChange} name="" id="" placeholder="Username" required/>
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" onChange={handleChange} name="" id="" placeholder="Password" required/>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    <div className="mt-3">
                    <GoogleLogin
                    clientId="903948333203-5hlqr2q43lst7986r8oqq6c9cvqv821h.apps.googleusercontent.com"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={'single_host_origin'}
                    />
                    </div>    
                    </div>
                    <div className="col-md-7 col-sm-12 mt-4">
                        <h3 className="mb-3">Create an Account</h3>
                        <form method='post' onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="email" className="form-control" onChange={handleChange} name="" id="" placeholder="Username" required/>
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" onChange={handleChange} name="" id="" placeholder="Email" required/>
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" onChange={handleChange} name="" id="" placeholder="Password" required/>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Create Account</button>
                        </form>
                    </div>

                    <div className="col-md-6 col-sm-12">

                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth