import React from "react";
import { Card, Typography, Box, Grid, Divider, Skeleton } from "@mui/material";
const PostDetailsSkeleton = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            width: "auto",
            margin: "auto",
            borderRadius: "15px",
          }}
        >
          <Skeleton
            sx={{ height: 350 }}
            animation="wave"
            variant="rectangular"
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
          <Skeleton
            animation="wave"
            style={{ marginTop: 3, marginBottom: 10, marginLeft: 4 }}
            height={20}
            width="50%"
          />
          <Skeleton
            animation="wave"
            style={{ marginTop: 3, marginBottom: 10, marginLeft: 4 }}
            height={20}
            width="50%"
          />
          <Skeleton
            animation="wave"
            style={{ marginTop: 3, marginBottom: 10, marginLeft: 4 }}
            height={20}
            width="50%"
          />
          <Skeleton
            animation="wave"
            style={{ marginTop: 3, marginBottom: 10, marginLeft: 4 }}
            height={20}
            width="50%"
          />
          <Skeleton
            animation="wave"
            style={{ marginTop: 3, marginBottom: 10, marginLeft: 4 }}
            height={20}
            width="50%"
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          animation="wave"
          style={{ marginTop: 1, marginBottom: 2, marginLeft: 4 }}
          height={20}
          width="90%"
        />
        <Skeleton
          animation="wave"
          style={{ marginTop: 1, marginBottom: 2, marginLeft: 4 }}
          height={20}
          width="90%"
        />
        <Skeleton
          animation="wave"
          style={{ marginTop: 1, marginBottom: 2, marginLeft: 4 }}
          height={20}
          width="90%"
        />
        <Skeleton
          animation="wave"
          style={{ marginTop: 1, marginBottom: 2, marginLeft: 4 }}
          height={20}
          width="90%"
        />
        <Divider
          textAlign="left"
          sx={{ color: "black", marginTop: 2 }}
        ></Divider>
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton
          animation="wave"
          style={{ marginTop: 1, marginBottom: 2, marginLeft: 4 }}
          height={130}
          width="100%"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton
          animation="wave"
          style={{ marginTop: 1, marginBottom: 2, marginLeft: 4 }}
          height={130}
          width="100%"
        />
      </Grid>
    </Grid>
  );
};

export default PostDetailsSkeleton;
