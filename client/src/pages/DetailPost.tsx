import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { TextField, IconButton, Button, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import config from "../config/config";
import "./style.css";
import Upload from "../utils/Upload";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
const Buffer = require("buffer").Buffer;

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

const DetailPost = () => {
  const [post, setPost] = useState(initialValues);
  const [image, setImage] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const navigate = useNavigate();
  const url: string = image
    ? image
    : "https://w.wallhaven.cc/full/od/wallhaven-od1wvl.png";
  const params = useParams();

  /* snackbar */
  const [open1, setOpen1] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = open1;
  const handleClose = () => {
    setOpen1({ ...open1, open: false, vertical: "top", horizontal: "right" });
  };

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
    setShowLoader(false);
  }, []);

  const generatePdf = async () => {
    setOpen1({ ...open1, open: true, vertical: "top", horizontal: "right" });
    const url = { url: window.location.href };
    const response = await axios.post(`${config.server}/api/getPdf`, url);
    const buffer = response.data;
    var bufferArray = base64ToArrayBufferAkash(buffer);
    var blobStore = new Blob([bufferArray], { type: "application/pdf" });
    var data = window.URL.createObjectURL(blobStore);
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = data;
    link.download = "blog.pdf";
    setOpen1({ ...open1, open: false, vertical: "top", horizontal: "right" });
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
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <Snackbar
            // @ts-ignore
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              Getting Pdf Ready
            </Alert>
          </Snackbar>
          <div className="detail_container">
            <img src={url} alt="post_image" className="detail_image" />
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
      )}
    </>
  );
};

export default DetailPost;
