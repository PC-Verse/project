import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import '../App.css';

const clientId = '32621617245-cajshuunfbe1tcn9bp36adkq5enec9h1.apps.googleusercontent.com' //insert client id here

function Logout(props) {

  const onSuccess = () => {
    console.log('Logout made successfully');
    // alert('Logout made successfully ✌');
    props.setLoggedIn(false);
    props.setName("Anonymous")
    props.setProfileObj(
      'username@ucsb.edu',
      "Anonymous",
      "Anonymous",
      "Anonymous",
      -1,
      "");
  };

  return (
    <div id="googleLogoutBtn"> 
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;