import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert, Delete } from "@mui/icons-material";
import banner from "../assets/banner.jpg";
import "./style.css";
import Modal from "./Modal";
import config from "../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface Props {
  post: {
    _id: string;
    title: string;
    desc: string;
    picture: string;
    createdAt: string;
    userName: string;
  };
}

const Post: React.FC<Props> = ({ post }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const image = post.picture
    ? post.picture
    : "https://w.wallhaven.cc/full/x8/wallhaven-x8qpod.jpg";
  const postDate = new Date(post.createdAt).toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  const id = post._id;
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e: any) => {
    setAnchorEl(null);
  };

  const deletePost = async (id: number) => {
    try {
      const res = await axios.delete(`${config.server}/api/delete/${id}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="post_container">
      <CardHeader
        avatar={<Avatar>H</Avatar>}
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVert />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <Modal
                  message="Delete"
                  modalHeader="Confirmation !"
                  modalMessage="Do you want to delete the post?"
                  func={deletePost}
                  id={id}
                />
                <Delete className="post-delete" />
              </MenuItem>
              <MenuItem
                style={{ fontSize: "16px", color: "black" }}
                onClick={() => navigate(`/update/${id}`)}
              >
                Update
                <Delete className="post-delete" />
              </MenuItem>
            </Menu>
          </>
        }
        title={post.title}
        subheader={`${postDate}ㅤㅤby-${post.userName}`}
      />
      <Link
        to={`/detail/${post._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia component="img" height="194" image={image} alt="no image" />
        <CardContent>
          <p>{post.desc}</p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default Post;
