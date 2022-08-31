import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Avatar, IconButton, Button } from "@mui/material";
import logo from "../assets/ttn-logo-name.png";
import GLogin from "./GLogin";
import { ExitToApp } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/actions/users";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: any) => state.user.user.user);
  /*  console.log(loggedUser); */

  useEffect(() => {}, [loggedIn]);

  const Logout = () => {
    dispatch(removeUser());
    setLoggedIn((p) => !p);
    localStorage.removeItem("token");
    navigate("/");
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
        {loggedUser ? (
          <>
            <Button
              variant="outlined"
              onClick={() => navigate(`/user/${loggedUser.user_id}`)}
            >
              Dashboard
            </Button>
            <IconButton>
              <Avatar
                style={{ height: "40px", width: "40px" }}
                src={loggedUser.userimage}
              />
            </IconButton>
            <p>{loggedUser.name}</p>
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
