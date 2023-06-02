import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import PostCardSkeleton from "../../components/PostCardSkeleton";
import Post from "../../components/Post";
import { likeFeedPost, deleteFeedPost } from "../../actions/feedPost";
const FeedPage = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.feedPostsReducer);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (posts.length) {
      setLoading(false);
    }
  }, [posts]);
  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        paddingX: 2,
        paddingTop: 2,
        paddingBottom: 20,
      }}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) =>
        loading ? (
          <Grid key={post._id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
            <PostCardSkeleton />
          </Grid>
        ) : (
          <Grid key={post._id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
            <Post
              post={post}
              likePost={likeFeedPost}
              deletePost={deleteFeedPost}
              postType={"feedPost"}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default FeedPage;
