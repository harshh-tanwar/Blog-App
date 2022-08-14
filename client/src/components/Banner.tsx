import React from "react";
import banner from "../assets/banner.jpg";
import logo from "../assets/ttn-logo.png";
import "./style.css";

const Banner = () => {
  return (
    <div className="container">
      <img src={banner} alt="banner" className="home_banner" />
      <div className="home_banner_text">
        <img src={logo} alt="logo" width="80px" />
        <div className="centered">TTN Blogs</div>
      </div>
    </div>
  );
};

export default Banner;
