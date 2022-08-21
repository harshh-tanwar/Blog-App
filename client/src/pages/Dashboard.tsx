import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Post from "../components/Post";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { userPosts } from "../redux/actions/posts";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.userPosts.userposts);
  const user = useSelector((state: any) => state.user.user.user);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [deleted, setDeleted] = useState<boolean>(false);
  const navigate = useNavigate();

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
    if (!user) {
      navigate("*");
      return;
    }
    dispatch(userPosts(user._id));
    setDeleted(false);
    if (deleted === true) {
      setOpen1({ ...open1, open: true, vertical: "top", horizontal: "right" });
    }
    setShowLoader(false);
  }, [deleted]);
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
            autoHideDuration={3000}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Post Deleted
            </Alert>
          </Snackbar>
          <div className="dash_container">
            <div className="dashUser_container">
              <img src={user.userImage} alt="userImage" width="200px" />
              <h1>{user.name}</h1>
              <h3>{user.email}</h3>
              <h3>User Posts - {posts.length}</h3>
            </div>
            <div className="dashPost_container">
              {posts.map((post: any) => (
                <Post
                  post={post}
                  deleted={deleted}
                  setDeleted={setDeleted}
                  key={post.id}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
