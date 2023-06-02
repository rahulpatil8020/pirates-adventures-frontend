import React, { useState, useEffect } from "react";
import { Grid, Stack, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import {
  likeAdventurePost,
  deleteAdventurePost,
} from "../../actions/adventurePosts";
import PostCardSkeleton from "../../components/PostCardSkeleton";
// import useStyles from './styles';

const HomePage = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.adventurePostsReducer);
  const [loading, setLoading] = useState(true);
  // const classes = useStyles();
  useEffect(() => {
    if (posts?.length > 0) {
      setLoading(false);
    }
  }, [posts]);
  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        spacing: 2,
        paddingX: 2,
        paddingTop: 2,
        paddingBottom: 20,
      }}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) =>
        loading ? (
          <Grid key={post._id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
            <PostCardSkeleton />
          </Grid>
        ) : (
          <Grid key={post._id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
            <Post
              loading={loading}
              post={post}
              likePost={likeAdventurePost}
              deletePost={deleteAdventurePost}
              postType={"adventurePost"}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default HomePage;
