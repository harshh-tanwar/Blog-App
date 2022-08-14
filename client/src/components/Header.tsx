import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Container, Avatar, IconButton } from "@mui/material";
import logo from "../assets/ttn-logo-name.png";

const Header = () => {
  const navigate = useNavigate();
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
        padding: "0 10vw",
      }}
    >
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="To the New Logo"
        width="100px"
      />

      <IconButton>
        <Avatar style={{ height: "30px", width: "30px" }} src={logo} />
      </IconButton>
    </AppBar>
  );
};

export default Header;
