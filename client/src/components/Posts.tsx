import React, { useState, useEffect } from "react";
import Post from "./Post";
import config from "../config/config";
import axios from "axios";
import "./style.css";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Posts = () => {
  const [posts, setPosts] = useState<
    {
      _id: string;
      title: string;
      desc: string;
      picture: string;
      createdAt: string;
      userName: string;
      userImage: string;
      userEmail: string;
    }[]
  >([]);
  const [deleted, setDeleted] = useState<boolean>(false);

  /* snackbar */
  const [open1, setOpen1] = useState({
    status: "success",
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
      let response = await axios.get(`${config.server}/api/posts`);
      console.log(response.data.data);
      setPosts(response.data.data);
    };
    fetchData();
    setDeleted(false);
    if (deleted === true) {
      setOpen1({ ...open1, open: true, vertical: "top", horizontal: "right" });
    }
  }, [deleted]);

  return (
    <div className="posts_container">
      <Snackbar
        // @ts-ignore
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Post Deleted
        </Alert>
      </Snackbar>
      {posts.reverse().map((post) => (
        <Post post={post} deleted={deleted} setDeleted={setDeleted} />
      ))}
    </div>
  );
};

export default Posts;
