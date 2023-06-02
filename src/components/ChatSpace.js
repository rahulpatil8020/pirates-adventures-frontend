import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    padding: theme.spacing(2),
  },
  messageContainer: {
    flexGrow: 1,
    overflow: "auto",
    marginBottom: theme.spacing(2),
  },
  message: {
    backgroundColor: theme.palette.grey[300],
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
    maxWidth: "75%",
    alignSelf: "flex-start",
  },
  ownMessage: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    alignSelf: "flex-end",
  },
  inputContainer: {
    display: "flex",
  },
  input: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  sendButton: {
    width: "100px",
  },
}));

const ChatSpace = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = {
      text: input,
      own: true,
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.messageContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${classes.message} ${
              message.own ? classes.ownMessage : ""
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className={classes.inputContainer}>
        <TextField
          className={classes.input}
          label="Type a message"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          className={classes.sendButton}
          variant="contained"
          color="primary"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatSpace;
