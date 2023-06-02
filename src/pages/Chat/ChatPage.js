import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Skeleton,
  Alert,
} from "@mui/material";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatRoomCard from "../../components/ChatRoomCard";
import { useLocation, useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { alpha } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { addChat, getAllChatRooms } from "../../actions/chatRoom";

const ChatPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const messageContainerRef = useRef(null);
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomid");
  const user = useSelector((state) => state.authReducer.authData);
  const [activeChat, setActiveChat] = useState(roomId);
  const chatRooms = useSelector((state) => state.chatRoomsReducer);
  const [currentChatRoom, setCurrentChatRoom] = useState(null);

  const [chatText, setChatText] = useState("");

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
    chatRooms?.map(
      (chatRoom) => chatRoom?._id === roomId && setCurrentChatRoom(chatRoom)
    );
  }, [chatRooms]);
  const handleAddChat = (e) => {
    e.preventDefault();
    dispatch(
      addChat(currentChatRoom._id, {
        chatText: chatText,
        user: user._id,
        userName: user.name,
        date: new Date(),
      })
    );
    setChatText("");
  };
  return (
    <Container
      sx={{ paddingTop: 5, paddingBottom: 30, height: "100vh" }}
      maxWidth="lg"
    >
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Chat Room
      </Typography>
      {!user || !chatRooms ? (
        <Skeleton width={40} height={30} />
      ) : (
        <Paper
          sx={{
            height: "100%",
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
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", marginRight: 1 }}
            >
              <Divider></Divider>
              {chatRooms.length > 0 &&
                chatRooms?.map((chatRoom) => (
                  <>
                    <ChatRoomCard
                      key={chatRoom._id}
                      activeChat={activeChat}
                      setActiveChat={setActiveChat}
                      chatRoom={chatRoom}
                      setCurrentChatRoom={setCurrentChatRoom}
                    />
                    <Divider></Divider>
                  </>
                ))}
            </Box>
            <Divider orientation="vertical"></Divider>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingX: 5,
                  height: 60,
                  backgroundColor: alpha(theme.palette.primary.main, 0.5),
                }}
              >
                {currentChatRoom ? (
                  <Typography variant="h6">{currentChatRoom.name}</Typography>
                ) : (
                  <Typography variant="h6">Chat Room</Typography>
                )}
              </Box>
              {roomId && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    height: "100%",
                    paddingY: 2,
                    paddingX: 4,
                  }}
                >
                  <TextField
                    sx={{ marginTop: 2 }}
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddChat(e);
                      }
                    }}
                    onChange={(e) => setChatText(e.target.value)}
                    value={chatText}
                    autoFocus
                    id="input-with-icon-textfield"
                    label="Type a message"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleAddChat}>
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box
                    ref={messageContainerRef}
                    sx={{
                      overflowY: "scroll",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {currentChatRoom?.chats
                      ?.sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map((chat) => (
                        <Box
                          style={{
                            alignSelf:
                              chat?.user === user?._id
                                ? "flex-end"
                                : "flex-start",
                            maxWidth: "45%",
                            padding: "2px 10px",
                            backgroundColor:
                              chat?.user === user?._id
                                ? theme.palette.primary.main
                                : theme.palette.secondary.main,
                            borderRadius: "5px",
                            margin: "5px 0",
                            color: "white",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 10,
                              color: "grey",
                              fontWeight: 700,
                            }}
                          >
                            {chat.userName}
                          </Typography>
                          <Typography>{chat.chatText}</Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      )}
      <Alert severity="info" sx={{ margin: 5 }} variant="outlined">
        Live Chat Comming Soon...
      </Alert>
    </Container>
  );
};

export default ChatPage;
