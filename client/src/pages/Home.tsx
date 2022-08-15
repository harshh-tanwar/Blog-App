import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Posts from "../components/Posts";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    setShowLoader(false);
  }, []);
  return (
    <>
      <Header />
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
  );
};

export default Home;
