import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Container,
  Card,
  CardMedia,
  Grid,
  Box,
  Typography,
  Divider,
  Avatar,
  CardActionArea,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { addAdventureParticipant } from "../../actions/adventurePosts";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { getAdventurePost } from "../../api";
import { useSearchParams } from "react-router-dom";
import PostDetailsSkeleton from "../../components/PostDetailsSkeleton";
import { addUserAdventure } from "../../actions/auth";
import { createChatRoom } from "../../actions/chatRoom";

const AdventurePostDetails = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer?.authData);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatRoomName, setChatRoomName] = useState("");
  const handleParticipate = (e) => {
    if (user?._id === postData?.createdBy) return;
    setDialogOpen(true);
  };

  const handleCreateChatRoom = (e) => {
    dispatch(
      createChatRoom({ name: chatRoomName, adventure: postData._id }, navigate)
    );
  };

  const confirmParticipate = () => {
    dispatch(addUserAdventure(user?._id, postData._id));
    dispatch(
      addAdventureParticipant(postData._id, user?._id, user?.name, navigate)
    );
  };

  const getOneAdventurePost = async (postId) => {
    const { data } = await getAdventurePost(postId);
    if (data) {
      setLoading(false);
    }
    setPostData(data);
  };

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const postId = searchParams.get("id");
    if (!postData) {
      getOneAdventurePost(postId);
    }
  }, []);
  return (
    <>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        confirmSubmit={confirmParticipate}
      />

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
                  <Box
                    sx={{
                      marginTop: 1,
                      display: "flex",
                    }}
                  >
                    <Typography sx={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                      {`Location :`}
                    </Typography>
                    <Typography sx={{ paddingLeft: 1 }} variant="body1">
                      {postData?.location}
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

                {postData?.adventureParticipants?.some(
                  (adventureParticipant) =>
                    adventureParticipant.userId === user?._id
                ) ? (
                  <Box
                    sx={{
                      padding: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                    }}
                  >
                    <Button onClick={handleParticipate} variant="contained">
                      Cancle Participation
                    </Button>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      padding: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                    }}
                  >
                    <Button onClick={handleParticipate} variant="contained">
                      Participate
                    </Button>
                  </Box>
                )}
                {user?._id === postData?.createdBy && (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Create Chat Room</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={3}>
                        <Input
                          name={"name"}
                          handleChange={(e) => {
                            setChatRoomName(e.target.value);
                          }}
                          label={"Chat Room Name"}
                          type="text"
                          autoComplete="off"
                          half
                          value={chatRoomName}
                        />
                        <Grid
                          item
                          xs={6}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant={"contained"}
                            onClick={handleCreateChatRoom}
                          >
                            Create Chat Room
                          </Button>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                )}
                <Divider textAlign="left" sx={{ color: "black", marginTop: 2 }}>
                  <Typography variant="h6">
                    {postData?.adventureParticipantsCount} Participant(s)
                  </Typography>
                </Divider>
              </Grid>

              {postData?.adventureParticipants.map((user) => (
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      width: "100%",
                    }}
                  >
                    <CardActionArea>
                      <CardContent
                        sx={{
                          marginX: 1,
                        }}
                        onClick={() => console.log("Clicked")}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            overflow: "hidden",
                          }}
                        >
                          <Avatar>
                            {user.userName.split(" ")[0][0]}
                            {user.userName.split(" ")[1][0]}
                          </Avatar>
                          <Box
                            sx={{
                              marginLeft: 1,
                              display: "block",
                              overflow: "hidden",
                            }}
                          >
                            <Typography noWrap variant={"h6"}>
                              {user?.userName}
                            </Typography>
                            <Typography noWrap>
                              {user?.userId === postData?.createdBy
                                ? "creator"
                                : "participant"}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <PostDetailsSkeleton />
          )}
        </Paper>
      </Container>
    </>
  );
};

export default AdventurePostDetails;
