import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import logo from "../../assets/commerce.png";
import UserContext from "../../context/UserContext";
import http from '../../http'
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright © ECommerce App
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false)
    const data = new FormData(event.currentTarget);
    http.post("/auth/login", {
      email: data.get("email"),
      password: data.get("password"),
    })
    .then(res => {
      setUser({
        isLoggedIn: true,
        ...res.data
      })
      localStorage.setItem("token", res.data.tokens.access.token)
      localStorage.setItem("user", JSON.stringify(res.data))
      if(res.data.user.role === "admin") {
        return navigate("/admin")
      }
      navigate("/")
    })
    .catch(() => setError(true))
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && <Typography color="red">Email or password incorrect!</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography
            component={Link}
            to="/signup"
            variant="body1"
            color="text.secondary"
          >
            {"Don't have an account? Sign Up"}
          </Typography>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
