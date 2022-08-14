import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import banner from "../assets/banner.jpg";
import "./style.css";

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
  return (
    <Card className="post_container">
      <CardHeader
        avatar={<Avatar>H</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={post.title}
        subheader={`${post.createdAt} by-${post.userName}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.picture}
        alt="Paella dish"
      />
      <CardContent>
        <p>{post.desc}</p>
      </CardContent>
    </Card>
  );
};

export default Post;
