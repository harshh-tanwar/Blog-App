import React, { useState, useContext, useEffect } from "react";
import "../utils/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config/config";
import { Button } from "@mui/material";
import googleLogo from "../assets/google-logo.png";

const GLogin = () => {
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      console.log("Hello");
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      /* if (/@tothenew.com\s*$/.test(user.email)) { */
      const userData = {
        name: user.displayName,
        email: user.email,
        userImage: user.photoURL,
      };

      const userDetails = await axios.post(
        `${config.server}/api/users`,
        userData
      );
      console.log(userDetails);

      localStorage.setItem("token", JSON.stringify(userDetails.data.token));
      localStorage.setItem("user-data", JSON.stringify(userDetails.data.user));

      navigate("/");
      /* } */
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  return (
    <div>
      <Button
        className="google_btn"
        variant="outlined"
        onClick={loginWithGoogle}
      >
        <img src={googleLogo} alt="googlelogo" width="30px" />
        ㅤLogin With Google
      </Button>
    </div>
  );
};

export default GLogin;
