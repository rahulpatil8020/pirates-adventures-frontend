import React, { useState, useEffect } from "react";
import HomePage from "./pages/Home/HomePage";
import AppHeader from "./components/AppHeader";
import FeedPage from "./pages/Feed/FeedPage";
import AddPostPage from "./pages/AddPost/AddPostPage";
import ChatPage from "./pages/Chat/ChatPage";
import Auth from "./pages/Auth/Auth";
import ProfilePage from "./pages/Profile/ProfilePage";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllAdventurePosts } from "./actions/adventurePosts";
import PrivateRoutes from "./utils/PrivateRoutes";
import { getAllFeedPosts } from "./actions/feedPost";
import { getGoogleMapsAPIKey } from "./actions/apiKeys";
import { getAllChatRooms } from "./actions/chatRoom";
import AdventurePostDetails from "./pages/PostDetails/AdventurePostDetails";
import FeedPostDetails from "./pages/PostDetails/FeedPostDetails";
import { getUser } from "./actions/auth";
const theme = createTheme({
  palette: {
    primary: {
      main: "#6418c9",
    },
    secondary: {
      main: "#7cc918",
    },
  },
});
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAdventurePosts());
    dispatch(getAllFeedPosts());
    dispatch(getGoogleMapsAPIKey());
    dispatch(getAllChatRooms());

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(getUser(user?.user?._id));
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/addPost" element={<AddPostPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/adventure/:id" element={<AdventurePostDetails />} />
            <Route path="/feed/:id" element={<FeedPostDetails />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
