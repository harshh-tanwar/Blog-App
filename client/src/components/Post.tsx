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
import { MoreVert, Delete, Edit } from "@mui/icons-material";
import "./style.css";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../redux/actions/posts";
import {DeletePic} from "../utils/Upload";

interface Props {
  post: {
    _id: string;
    title: string;
    desc: string;
    picture: string;
    pictureId: string;
    createdAt: string;
    userName: string;
    userimage: string;
    userEmail: string;
  };
  deleted: any;
  setDeleted: any;
}

const Post: React.FC<Props> = ({ post, deleted, setDeleted }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state: any) => state.user.user.user);
  const image = post.picture
    ? post.picture
    : "https://w.wallhaven.cc/full/od/wallhaven-od1wvl.png";
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

  const deletePost1 = async (id: any) => {
    try {
      await DeletePic(post.pictureId)
      dispatch(deletePost(id));
      setDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="post_container">
      <CardHeader
        avatar={<Avatar src={post.userimage} />}
        action={
          <>
            {user && user.email === post.userEmail ? (
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
                      func={deletePost1}
                      id={id}
                    />
                    <Delete style={{ color: "red" }} />
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: "16px", color: "black" }}
                    onClick={() => navigate(`/update/${id}`)}
                  >
                    Editㅤ
                    <Edit style={{ color: "blue" }} />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <></>
            )}
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
