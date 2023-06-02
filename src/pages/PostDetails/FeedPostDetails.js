import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Paper,
  Container,
  Card,
  CardMedia,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import moment from "moment";
import { getFeedPost } from "../../api";
import PostDetailsSkeleton from "../../components/PostDetailsSkeleton";

const FeedPostDetails = () => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const getOneFeedPost = async (postId) => {
    const { data } = await getFeedPost(postId);
    if (data) {
      setLoading(false);
    }
    setPostData(data);
  };
  const [searchParams] = useSearchParams();
  console.log();
  useEffect(() => {
    const postId = searchParams.get("id");
    if (!postData) {
      getOneFeedPost(postId);
    }
  }, []);
  return (
    <>
      <Container sx={{ marginBottom: 10 }} maxWidth={"md"}>
        <Paper
          sx={{
            marginTop: "20px",
            boxShadow:
              "0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0px rgba(0, 0, 0, 0.19)",
            borderRadius: "15px",
            paddingY: "20px",
            paddingX: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!loading ? (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    width: "auto",
                    margin: "auto",
                    borderRadius: "15px",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 0,
                      paddingTop: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      backgroundBlendMode: "darken",
                    }}
                    image={
                      postData?.image ||
                      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    }
                    title={postData?.title}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "center",
                    marginBottom: 2,
                    marginTop: 2,
                  }}
                >
                  <Box sx={{ marginTop: 1, display: "flex" }}>
                    <Typography
                      component={"h6"}
                      variant={"body1"}
                      sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
                    >
                      Name :
                    </Typography>
                    <Typography sx={{ paddingLeft: 1, fontWeight: 500 }}>
                      {` ${postData?.title}`}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      marginTop: 1,
                      display: "flex",
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>Creator :</Typography>
                    <Typography sx={{ paddingLeft: 1 }} variant="body1">
                      {`${postData?.creatorName}`}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      marginTop: 1,
                      display: "flex",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Created On :
                    </Typography>
                    <Typography
                      sx={{ paddingLeft: 1 }}
                      variant="body1"
                    >{`${moment(postData?.createdOn).format(
                      "YYYY-MM-DD"
                    )}`}</Typography>
                  </Box>
                  <Box
                    sx={{
                      marginTop: 1,
                      display: "flex",
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
                      variant="body1"
                    >{`Tags : `}</Typography>
                    <Typography sx={{ paddingLeft: 1 }}>
                      {postData?.tags?.join(" ")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    marginTop: 1,
                    display: "flex",
                  }}
                >
                  <Typography sx={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                    {`Details :`}
                  </Typography>
                  <Typography
                    textAlign={"justify"}
                    sx={{ paddingLeft: 1 }}
                    variant="body1"
                  >
                    {postData?.details}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <PostDetailsSkeleton />
          )}
        </Paper>
      </Container>
    </>
  );
};

export default FeedPostDetails;
