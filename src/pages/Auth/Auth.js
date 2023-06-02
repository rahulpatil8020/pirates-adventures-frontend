import React, { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "../../components/Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(login(formData, navigate));
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Container maxWidth={"xs"}>
        <Paper
          sx={{
            marginTop: "20px",
            boxShadow:
              "0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0px rgba(0, 0, 0, 0.19)",
            borderRadius: "15px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h5" variant="h5">
              {isSignup ? "Sign Up" : "Sign In"}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup ? (
                <>
                  <Input
                    name="firstName"
                    handleChange={handleInputChange}
                    label={"First Name"}
                    type="text"
                    half
                    autoFocus
                  />

                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleInputChange}
                    type="text"
                    half
                  />
                </>
              ) : null}
              <Input
                name="email"
                label="Email"
                handleChange={handleInputChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleInputChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup ? (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleInputChange}
                  type="password"
                />
              ) : null}
            </Grid>
            <Button
              sx={{ marginTop: (theme) => `${theme.spacing(3)}` }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          <Button onClick={switchMode}>
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Auth;
