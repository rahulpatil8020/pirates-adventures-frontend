import React from "react";
import { Card, CardHeader, Skeleton } from "@mui/material";

const PostCardSkeleton = () => {
  return (
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
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        action={null}
        sx={{
          "& .MuiCardHeader-content": {
            display: "block",
            overflow: "hidden",
          },
        }}
        title={
          <Skeleton
            animation="wave"
            height={18}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton sx={{ height: 150 }} animation="wave" variant="rectangular" />

      <Skeleton
        animation="wave"
        style={{ marginTop: 3, marginBottom: 10, marginLeft: 4 }}
        height={10}
        width="40%"
      />

      <div style={{ marginLeft: 4, marginRight: 4 }}>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 3 }} />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 3 }} />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 3 }} />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 20 }} />
      </div>
    </Card>
  );
};

export default PostCardSkeleton;
