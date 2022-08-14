import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { TextField, IconButton, Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import config from "../config/config";
import "./style.css";
import Upload from "../utils/Upload";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
  title: "",
  desc: "",
  picture: "",
  userName: "Harsh",
};

const DetailPost = () => {
  const [post, setPost] = useState(initialValues);
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>("");
  const navigate = useNavigate();
  const url: string = image
    ? image
    : "https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg";
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${config.server}/api/post/${params.id}`
      );
      const oldPost = response.data.data;
      setPost(oldPost);
      setImage(oldPost.picture);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <img src={image} alt="post_image" className="detail_image" />
      <h3>{post.title}</h3>
      <p>{post.desc}</p>
    </>
  );
};

export default DetailPost;
