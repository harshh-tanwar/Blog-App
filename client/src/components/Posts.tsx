import React, { useState, useEffect } from "react";
import Post from "./Post";
import config from "../config/config";
import axios from "axios";
import "./style.css";

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
  const [deleted, setDeleted] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`${config.server}/api/posts`);
      console.log(response.data.data);
      setPosts(response.data.data);
    };
    fetchData();
  }, [deleted]);

  return (
    <div className="posts_container">
      {posts.reverse().map((post) => (
        <Post post={post} deleted={deleted} setDeleted={setDeleted} />
      ))}
    </div>
  );
};

export default Posts;
