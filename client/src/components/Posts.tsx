import React, { useState, useEffect } from "react";
import Post from "./Post";
import "./style.css";
import { Snackbar, Avatar, IconButton, Button } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/actions/posts";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.posts.posts);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");

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

  const toggleSearch = () => {
    setOpenSearch((p) => !p);
  };

  const filteredPosts = posts.filter((post1: any) =>
    post1.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="posts_container">
      <div className="posts_options">
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/create")}
          style={{ margin: "10px 0 10px 0" }}
        >
          <strong>Create Blog</strong>
        </Button>
        <div>
          <IconButton onClick={() => toggleSearch()}>
            <Avatar style={{ height: 50, width: 50 }}>
              <Search style={{ color: "black", fontSize: 30 }} />
            </Avatar>
          </IconButton>
          {openSearch ? (
            <>
              <input
                type="text"
                name="search"
                placeholder="Search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="posts-input"
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
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
      <div className="posts_items">
        {filteredPosts.length !== 0 ? (
          <>
            {filteredPosts.map((post: any) => (
              <Post
                post={post}
                deleted={deleted}
                setDeleted={setDeleted}
                key={post._id}
              />
            ))}
          </>
        ) : (
          <p>No related items</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
