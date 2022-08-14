import React, { useState, useEffect } from "react";
import Post from "./Post";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import config from "../config/config";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState<
    {
      _id: string;
      title: string;
      desc: string;
      picture: string;
      createdAt: string;
      userName: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`${config.server}/api/posts`);
      console.log(response.data.data);
      setPosts(response.data.data);
    };
    fetchData();
  }, []);

  return (
    <div style={{display: "flex"}}>
      {posts.reverse().map((post) => (
        <Grid item lg={3} md={4} sm={12} xs={12}>
          <Post post={post} />
        </Grid>
      ))}
    </div>
  );
};

export default Posts;
