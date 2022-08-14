import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Box, TextField, IconButton } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import config from "../config/config";
import axios from "axios";
import "./style.css";

const CreatePost = () => {
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>("");
  const url: string =
    /* picture ? picture : */ "https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        /* console.log(file.name); */

        const image = await axios.post(`${config.server}/api/upload`, data);
        setImage(image.data);
        console.log(`poop - ${image.data.message}`)
      }
    };
    getImage();
  }, [file]);

  return (
    <>
      <Header />
      <div className="cp_container">
        <Box component="form" className="cp_form">
          <img src={url} alt="" />
          <div className="cp_image">
            <IconButton color="primary" component="label">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setFile(e.target.files[0]);
                }}
              />
              <AttachFile fontSize="medium" />
            </IconButton>
            <p>Upload</p>
          </div>
          <TextField
            id="outlined-basic"
            label="Title"
            multiline
            className="cp_item"
          />
          <TextField
            id="outlined-basic"
            label="Description"
            multiline
            rows={3}
            className="cp_item"
          />
        </Box>
      </div>
    </>
  );
};

export default CreatePost;
