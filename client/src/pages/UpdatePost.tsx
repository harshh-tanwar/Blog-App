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

const UpdatePost = () => {
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

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const name = `${new Date().getTime()}_${file.name}`;
        const image = await Upload(file, name);
        setImage(image);
        post.picture = image;
      }
    };
    getImage();
  }, [file]);

  const handleChange = (e: any) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    console.log(post);
    const res = await axios.put(
      `${config.server}/api/update/${params.id}`,
      post
    );
    console.log(res.data);
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <>
      <Header />
      <div className="cp_container">
        <div className="cp_form">
          <img src={url} alt="post_image" className="cp_picture" />
          <div className="cp_image">
            <IconButton color="primary" component="label">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <PhotoCamera fontSize="medium" />
            </IconButton>
            {image ? <p>Uploaded</p> : <p>Upload</p>}
          </div>
          <TextField
            id="outlined-basic"
            label="Title"
            multiline
            className="cp_item"
            onChange={(e) => handleChange(e)}
            name="title"
            value={post.title}
            focused
          />
          <TextField
            id="outlined-basic"
            label="Description"
            multiline
            rows={4}
            className="cp_item"
            onChange={(e) => handleChange(e)}
            name="desc"
            value={post.desc}
            focused
          />
          <div className="cp_buttons">
            <Button
              variant="outlined"
              size="large"
              color="error"
              onClick={() => navigate("/")}
            >
              <strong>Back</strong>
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="success"
              onClick={savePost}
            >
              <strong>Update</strong>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePost;
