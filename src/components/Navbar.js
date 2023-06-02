import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const navigationBarAction = {
  color: "white",
  borderRadius: 4,
  "&:hover": {
    transform: "scale(1.1)",
  },
  "&.Mui-selected": {
    transition: "0.3s",
    transform: "scale(1.1)",
    backgroundColor: "#6418c9",
  },
  "&.MuiBottomNavigationAction-root.Mui-selected": {
    color: "white",
  },
};
export default function Navbar() {
  const [value, setValue] = useState(window.location.pathname.slice(1));
  const location = useLocation();

  useEffect(() => {
    setValue(location.pathname.slice(1));
  }, [location]);
  return (
    <Box
      sx={[
        {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: 30,
        },
        (theme) => ({
          [theme.breakpoints.down("sm")]: {
            bottom: 2,
          },
        }),
      ]}
    >
      <BottomNavigation
        sx={{ backgroundColor: "#7cc918", borderRadius: 4 }}
        defaultValue={"Nearby"}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          sx={navigationBarAction}
          LinkComponent={Link}
          to="/"
          value={""}
          label="Home"
          icon={<HomeIcon />}
        />

        <BottomNavigationAction
          sx={navigationBarAction}
          LinkComponent={Link}
          to="/feed"
          value={"feed"}
          label="Feed"
          icon={<PublicIcon />}
        />
        <BottomNavigationAction
          sx={navigationBarAction}
          LinkComponent={Link}
          to="/addPost"
          state={{ type: "feedPost" }}
          value={"addPost"}
          icon={<AddCircleIcon />}
        />
        <BottomNavigationAction
          sx={navigationBarAction}
          LinkComponent={Link}
          to="/chat"
          value={"chat"}
          label="Chat"
          icon={<ChatIcon />}
        />
        <BottomNavigationAction
          sx={navigationBarAction}
          LinkComponent={Link}
          to="/profile"
          value={"profile"}
          label="Profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
