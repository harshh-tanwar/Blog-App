import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { TextField, IconButton, Button, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { PhotoCamera } from "@mui/icons-material";
import "./style.css";
import Upload from "../utils/Upload";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/actions/posts";

const initialValues = {
  title: "",
  desc: "",
  picture: "",
  userName: "Harsh",
  userImage: "",
  userEmail: "",
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreatePost = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [post, setPost] = useState(initialValues);
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>("");
  const navigate = useNavigate();
  const loggedUser = useSelector((state: any) => state.user.user.user);
  const url: string = image
    ? image
    : "https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg";

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
    if (loggedUser == undefined || loggedUser == null) {
      navigate("/");
    } else {
      post.userImage = loggedUser.userImage;
      post.userName = loggedUser.name;
      post.userEmail = loggedUser.email;
      const getImage = async () => {
        if (file) {
          const name = `${new Date().getTime()}_${file.name}`;
          const image = await Upload(file, name);
          setImage(image);
          post.picture = image;
        }
      };
      getImage();
      setShowLoader(false);
    }
  }, [file]);

  const handleChange = (e: any) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    console.log(post);
    if (post.title == "") {
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
    if (post.desc == "") {
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
    dispatch(createPost(post));
    /* const res = await axios.post(`${config.server}/api/create`, post); */
    setOpen1({
      ...open1,
      open: true,
      vertical: "top",
      horizontal: "right",
      message: "Post Created",
      status: "success",
    });
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <>
      {loggedUser != undefined && (
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
                />
                <TextField
                  id="outlined-basic"
                  label="Description"
                  multiline
                  rows={4}
                  className="cp_item"
                  onChange={(e) => handleChange(e)}
                  name="desc"
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
                    <strong>Publish</strong>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CreatePost;
