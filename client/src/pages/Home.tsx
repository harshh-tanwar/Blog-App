import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Posts from "../components/Posts";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const user = useSelector((state: any) => state.user.user.user);

  useEffect(() => {
    setShowLoader(false);
  }, []);
  return (
    <>
      <Header />
      {!user && (
        <h1 style={{ textAlign: "center", paddingTop: "10vh" }}>
          Login to access content.
        </h1>
      )}
      {user && (
        <>
          {showLoader ? (
            <Loader />
          ) : (
            <>
              <Banner />
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/create")}
                style={{ margin: "10px 0 10px 10vw" }}
              >
                <strong>Create Blog</strong>
              </Button>
              <Posts />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
