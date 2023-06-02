import { Container, Typography, Button, Stack, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import CreatePost from "../../components/CreatePost";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AddPostPage = () => {
  const user = useSelector((state) => state.authReducer?.authData);
  const initialFormData = {
    title: "",
    tags: [],
    details: "",
    image: "",
    createdBy: user?._id,
    creatorName: user?.name,
    location: "",
    adventureParticipants: [{ userId: user?._id, userName: user?.name }],
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(initialFormData);
  const [createType, setCreateType] = useState(location?.state?.type);
  useEffect(() => {
    setFormData(
      location.state.postData ? location.state.postData : initialFormData
    );
  }, [user, location]);
  return (
    <Container sx={{ paddingTop: 5, paddingBottom: 20 }}>
      {createType === "feedPost" && (
        <>
          {location.state.postData ? (
            <Typography variant="h4" sx={{ margin: 2 }}>
              Update Post
            </Typography>
          ) : (
            <Typography variant="h4" sx={{ margin: 2 }}>
              Create Post
            </Typography>
          )}
          <CreatePost
            postName="feedPost"
            postLabel="Feed Post Name"
            type="feedPost"
            formData={formData}
            setFormData={setFormData}
          />
        </>
      )}
      {createType === "adventurePost" && (
        <>
          <Typography variant="h4" sx={{ marginX: 2, marginY: 3 }}>
            Create Adventure
          </Typography>
          <CreatePost
            postName="adventurePost"
            postLabel="Adventure Post Name"
            type="adventurePost"
            formData={formData}
            setFormData={setFormData}
          />
        </>
      )}
      {formData?.details?.split(" ").length < 50 && (
        <Alert sx={{ marginTop: 2 }} severity="info">
          The Details should be 50 words at least
        </Alert>
      )}
      <div style={{ marginTop: 10 }}>
        {createType === "adventurePost" && (
          <Button
            onClick={() => {
              setFormData(initialFormData);
              setCreateType("feedPost");
              navigate("/addPost", { state: { type: "feedPost" } });
            }}
            variant="contained"
          >
            Create Feed Post
          </Button>
        )}
        {createType === "feedPost" && (
          <Button
            onClick={() => {
              setFormData(initialFormData);
              setCreateType("adventurePost");
              navigate("/addPost", { state: { type: "adventurePost" } });
            }}
            variant="outlined"
          >
            Create Adventure
          </Button>
        )}
      </div>
    </Container>
  );
};

export default AddPostPage;
