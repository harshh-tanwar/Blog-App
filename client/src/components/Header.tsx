import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Container, Avatar, IconButton, Button } from "@mui/material";
import logo from "../assets/ttn-logo-name.png";
import GLogin from "./GLogin";
import { ExitToApp } from "@mui/icons-material";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  var user = JSON.parse(localStorage.getItem("user-data"));

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  });
  useEffect(() => {}, [loggedIn]);

  const Logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <AppBar
      style={{
        position: "sticky",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        color: "black",
        padding: "0 5vw 0 10vw",
      }}
    >
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="To the New Logo"
        width="100px"
      />
      <div
        style={{
          width: "450px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {user ? (
          <>
            <Button variant="outlined" onClick={() => navigate(`/user/${user._id}`)}>
              Dashboard
            </Button>
            <IconButton>
              <Avatar
                style={{ height: "40px", width: "40px" }}
                src={user.userImage}
              />
            </IconButton>
            <p>{user.name}</p>
            <Button variant="outlined" color="error" onClick={Logout}>
              <ExitToApp style={{ color: "peach" }} />
              ㅤLogout
            </Button>
          </>
        ) : (
          <GLogin />
        )}
      </div>
    </AppBar>
  );
};

export default Header;
