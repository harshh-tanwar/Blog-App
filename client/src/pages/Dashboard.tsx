import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Post from "../components/Post";
import Header from "../components/Header";
import Loader from "../components/Loader";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
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
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [postCount, setPostCount] = useState<number>(0);
  const [deleted, setDeleted] = useState<boolean>(false);
  var user = JSON.parse(localStorage.getItem("user-data"));

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
      let response = await axios.get(
        `${config.server}/api/posts?userId=${user._id}`
      );
      console.log(response.data.data);
      setPosts(response.data.data);
      setPostCount(response.data.count);
    };
    fetchData();
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
              <h3>User Posts - {postCount}</h3>
            </div>
            <div className="dashPost_container">
              {posts.reverse().map((post) => (
                <Post post={post} deleted={deleted} setDeleted={setDeleted} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
