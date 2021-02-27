import React, { useState } from 'react'
import '../App.css'
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '32621617245-cajshuunfbe1tcn9bp36adkq5enec9h1.apps.googleusercontent.com' //insert client id here

function Login(props) {

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    // alert(
    //   `Logged in successfully! Welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    refreshTokenSetup(res);
    
    props.setName(res.profileObj.name)
    props.setProfileObj(
      res.profileObj.email,
      res.profileObj.familyName,
      res.profileObj.givenName,
      res.profileObj.name,
      res.profileObj.googleId,
      res.profileObj.imageUrl
    );
    props.setLoggedIn(true);

    // this.props.updateIntereactedPosts();


  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // alert(
    //   `Failed to login 😢. Please try again`
    // );
  };

  
  return (

    <div id="googleLoginBtn"> 
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;