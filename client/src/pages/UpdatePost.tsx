import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { TextField, IconButton, Button, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import config from "../config/config";
import "./style.css";
import { Upload } from "../utils/Upload";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { updatePost } from "../redux/actions/posts";
import { useDispatch } from "react-redux";
import { initPost } from "./types";

const initialValues: initPost = {
  title: "",
  desc: "",
  picture: "",
  pictureId: "",
  userName: "Harsh",
  userimage: "",
  userEmail: "",
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdatePost = () => {
  const dispatch = useDispatch();
  const [post, setPost] = useState(initialValues);
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const navigate = useNavigate();
  const url: string = image
    ? image
    : "https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg";
  const params = useParams();

  /* snackbar */
  const [open1, setOpen1] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Post Created",
    status: "success",
  });
  const { vertical, horizontal, open } = open1;
  const handleClose = () => {
    setOpen1({ ...open1, open: false, vertical: "top", horizontal: "right" });
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchData = async () => {
      const res = await axios.get(`${config.server}/api/post/${params.id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      const oldPost = res.data.data;
      setPost(oldPost);
      setImage(oldPost.picture);
    };
    fetchData();
    setShowLoader(false);
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const name = `${new Date().getTime()}_${file.name}`;
        const image = await Upload(file, name);
        setImage(image.location);
        post.picture = image.location;
        console.log(image.key);
        post.pictureId = image.key;
      }
    };
    getImage();
  }, [file]);

  const handleChange = (e: any) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    console.log(post);
    if (post.title === "") {
      setOpen1({
        ...open1,
        open: true,
        vertical: "top",
        horizontal: "right",
        message: "Title missing",
        status: "error",
      });
      return;
    }
    if (post.desc === "") {
      setOpen1({
        ...open1,
        open: true,
        vertical: "top",
        horizontal: "right",
        message: "Description missing",
        status: "error",
      });
      return;
    }
    dispatch(updatePost(params.id, post));
    setOpen1({
      ...open1,
      open: true,
      vertical: "top",
      horizontal: "right",
      message: "Post Updated",
      status: "success",
    });
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <>
      <Header />
      {showLoader ? (
        <Loader />
      ) : (
        <div className="cp_container">
          {open1.status === "success" ? (
            <Snackbar
              // @ts-ignore
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              key={vertical + horizontal}
              autoHideDuration={3000}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {open1.message}
              </Alert>
            </Snackbar>
          ) : (
            <Snackbar
              // @ts-ignore
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              key={vertical + horizontal}
              autoHideDuration={3000}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {open1.message}
              </Alert>
            </Snackbar>
          )}
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
      )}
    </>
  );
};

export default UpdatePost;
