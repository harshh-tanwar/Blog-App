import React, { useState, useEffect } from "react";
import Post from "./Post";
import "./style.css";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/actions/posts";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.posts.posts);
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
    dispatch(getPosts());
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
      {posts.reverse().map((post: any) => (
        <Post
          post={post}
          deleted={deleted}
          setDeleted={setDeleted}
          key={post._id}
        />
      ))}
    </div>
  );
};

export default Posts;
