import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/commerce.png";
import http from "../../http";
import UserContext from "../../context/UserContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright © ECommerce App
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function SignUp() {
  const [error, setError] = React.useState({});
  const { user, setUser } = React.useContext(UserContext);
  let navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get("password") !== data.get("confirmPassword")) {
      return setError({
        confirmPassword: "Passwords do not match"
      });
    }

    http.post("/auth/register", {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    }).then((res) => {
      setUser({
        isLoggedIn: true,
        ...res.data
      })
      localStorage.setItem("token", res.data.tokens.access.token)
      localStorage.setItem("user", JSON.stringify(res.data))
      navigate("/")
    })
    .catch((err) => {
      console.log(err.response)
      setError(err.response.data)
    })
  };

  if(user.isLoggedIn) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar>
          <img src={logo} alt="Sign-In" height="40px" width="40px" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputProps={{
                  type: "email",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={!!error.confirmPassword}
                helperText={error.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography
                component={Link}
                to="sign-in"
                variant="body1"
                color="text.secondary"
              >
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
