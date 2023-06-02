import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardHeader,
  Tooltip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  Slide,
  DialogTitle,
  CardActionArea,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Post = ({ post, likePost, deletePost, loading, postType }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuUpdate = () => {
    navigate("/addPost", { state: { type: postType, postData: post } });
  };
  const user = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const onConfirmDeletePost = () => {
    dispatch(deletePost(post._id));
  };
  const handleDeletePost = () => {
    setDialogOpen(true);
  };
  const handlePostDetails = () => {
    if (postType === "adventurePost")
      navigate({
        pathname: `/adventure/${post._id}`,
        search: `?${createSearchParams({ id: post._id })}`,
      });
    else
      navigate({
        pathname: `/feed/${post._id}`,
        search: `?${createSearchParams({ id: post._id })}`,
      });
  };
  return (
    <>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"You sure about this?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose}>No</Button>
          <Button onClick={onConfirmDeletePost}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "15px",
          height: "100%",
          position: "relative",
        }}
      >
        <CardHeader
          avatar={
            <Avatar alt="User Profile">
              {user?.name?.split(" ")[0][0]}
              {user?.name?.split(" ")[1][0]}
            </Avatar>
          }
          action={
            <>
              <IconButton
                aria-label="menu-button"
                id="menu-button"
                aria-controls={open ? "menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleMenuClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu"
                aria-labelledby="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem onClick={handlePostDetails}>Details</MenuItem>
                {post.createdBy === user?._id ? (
                  <MenuItem onClick={handleMenuUpdate}>Update</MenuItem>
                ) : null}
              </Menu>
            </>
          }
          sx={{
            "& .MuiCardHeader-content": {
              display: "block",
              overflow: "hidden",
            },
          }}
          title={
            <Tooltip title={post.title} arrow placement="top">
              <Typography variant="body1" noWrap sx={{ fontWeight: 500 }}>
                {post.title}
              </Typography>
            </Tooltip>
          }
          subheader={`${moment(post.createdOn).fromNow()} By ${
            post.creatorName
          }`}
        />
        <CardActionArea onClick={handlePostDetails}>
          <CardMedia
            sx={{
              height: 0,
              paddingTop: "56.25%",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backgroundBlendMode: "darken",
            }}
            image={
              post.image ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            title={post.title}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "horizontal",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          ></div>
          <Typography
            sx={{ paddingLeft: 2 }}
            variant="body2"
            color="textSecondary"
            component="h2"
          >
            {post?.tags?.slice(0, 2).map((tag) => `${tag} `)}
          </Typography>
          <CardContent>
            <Typography
              sx={{
                textAlign: "justify",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
              }}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {post.details.substring(0, 150)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            padding: "0 16px 8px 16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(post._id, user?._id))}
          >
            {post?.likedBy?.includes(user?._id) ? (
              <ThumbUpAltIcon fontSize="small" />
            ) : (
              <ThumbUpOffAltIcon fontSize="small" />
            )}{" "}
            Like {post.likes > 0 ? post.likes : null}
          </Button>
          {post.createdBy === user?._id ? (
            <Button size="small" color="primary" onClick={handleDeletePost}>
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
