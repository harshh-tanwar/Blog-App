import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { TextField, IconButton, Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import config from "../config/config";
import "./style.css";
import Upload from "../utils/Upload";
import { useNavigate, useParams } from "react-router-dom";
const Buffer = require("buffer").Buffer;

const initialValues = {
  title: "",
  desc: "",
  picture: "",
  userName: "Harsh",
};

const DetailPost = () => {
  const [post, setPost] = useState(initialValues);
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

  const generatePdf = async () => {
    const url = { url: window.location.href };
    const response = await axios.post(`${config.server}/api/getPdf`, url);
    const buffer = response.data;
    var bufferArray = base64ToArrayBufferAkash(buffer);
    var blobStore = new Blob([bufferArray], { type: "application/pdf" });
    var data = window.URL.createObjectURL(blobStore);
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = data;
    link.download = "output.pdf";
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
  };

  const base64ToArrayBufferAkash = (data: any) => {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
      var ascii = bString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };

  return (
    <>
      <Header />
      <div className="detail_container">
        <img src={image} alt="post_image" className="detail_image" />
        <div className="detail_buttons">
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
            onClick={generatePdf}
          >
            <strong>Download as Pdf</strong>
          </Button>
        </div>
        <h3>{post.title}</h3>
        <p>{post.desc}</p>
      </div>
    </>
  );
};

export default DetailPost;
