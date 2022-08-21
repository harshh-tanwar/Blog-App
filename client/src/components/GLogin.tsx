import React, { useState, useEffect } from "react";
import "../utils/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import googleLogo from "../assets/google-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/actions/users";

const GLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedUser = useSelector((state: any) => state.user.user);

  const loginWithGoogle = async () => {
    try {
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

      dispatch(getUser(userData));

      navigate("/");
      /*  } */
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
